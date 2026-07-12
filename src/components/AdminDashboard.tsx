import { useState, useEffect } from 'react';
import { 
  getEbookRegistrations, 
  getCoachRegistrations, 
  getGiftRegistrations, 
  getCourseRegistrations,
  updateEbookRegStatus, 
  updateCoachRegStatus, 
  updateGiftRegSynced,
  updateCourseRegStatus,
  deleteEbookReg,
  deleteCoachReg,
  deleteGiftReg,
  deleteCourseReg,
  googleSignIn, 
  logout, 
  auth,
  EbookReg,
  CoachReg,
  GiftReg,
  CourseReg
} from '../lib/firebase';
import { 
  User as FirebaseUser,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  Gift, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Database, 
  FileSpreadsheet, 
  LogOut, 
  User, 
  Lock, 
  AlertCircle,
  Trash2,
  ExternalLink,
  Settings,
  Check,
  Sparkles,
  Video
} from 'lucide-react';

// Authorized emails - add user's email as primary admin
const ADMIN_EMAILS = ['tongthuyan676@gmail.com', 'admin@tongthuyan.com'];

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Data states
  const [activeTab, setActiveTab] = useState<'ebook' | 'coach' | 'gifts' | 'courses'>('ebook');
  const [ebooks, setEbooks] = useState<EbookReg[]>([]);
  const [coaches, setCoaches] = useState<CoachReg[]>([]);
  const [gifts, setGifts] = useState<GiftReg[]>([]);
  const [courses, setCourses] = useState<CourseReg[]>([]);

  const spreadsheetId = '1k_RFifJGuIYeKa_BNFLUiksIzsS7AJADPAsbg3OE-PE';
  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthLoading(false);
      if (currentUser) {
        // Validate admin email
        if (ADMIN_EMAILS.includes(currentUser.email || '')) {
          setUser(currentUser);
          loadAllData();
        } else {
          setError(`Tài khoản ${currentUser.email} không có quyền truy cập trang quản trị.`);
          logout();
        }
      } else {
        setUser(null);
        setAccessToken(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [ebookData, coachData, giftData, courseData] = await Promise.all([
        getEbookRegistrations(),
        getCoachRegistrations(),
        getGiftRegistrations(),
        getCourseRegistrations()
      ]);
      setEbooks(ebookData);
      setCoaches(coachData);
      setGifts(giftData);
      setCourses(courseData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Lỗi tải dữ liệu đăng ký từ cơ sở dữ liệu.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        if (ADMIN_EMAILS.includes(result.user.email || '')) {
          setUser(result.user);
          setAccessToken(result.accessToken);
          loadAllData();
          setSuccess('Đăng nhập quản trị thành công!');
          setTimeout(() => setSuccess(null), 3000);
        } else {
          setError(`Tài khoản ${result.user.email} không được cấp quyền quản trị.`);
          await logout();
        }
      }
    } catch (err: any) {
      console.error(err);
      setError('Đăng nhập Google thất bại. Vui lòng cấp quyền đầy đủ.');
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setEbooks([]);
    setCoaches([]);
    setGifts([]);
    setCourses([]);
  };

  const toggleEbookPayment = async (id: string, currentStatus: 'Chưa thanh toán' | 'Đã thanh toán') => {
    const newStatus = currentStatus === 'Chưa thanh toán' ? 'Đã thanh toán' : 'Chưa thanh toán';
    try {
      await updateEbookRegStatus(id, newStatus);
      setEbooks(ebooks.map(e => e.id === id ? { ...e, status: newStatus } : e));
      setSuccess('Cập nhật trạng thái thanh toán ebook thành công!');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError('Lỗi cập nhật trạng thái thanh toán.');
    }
  };

  const toggleCoachPayment = async (id: string, currentStatus: 'Chưa thanh toán' | 'Đã thanh toán') => {
    const newStatus = currentStatus === 'Chưa thanh toán' ? 'Đã thanh toán' : 'Chưa thanh toán';
    try {
      await updateCoachRegStatus(id, newStatus);
      setCoaches(coaches.map(c => c.id === id ? { ...c, status: newStatus } : c));
      setSuccess('Cập nhật trạng thái thanh toán coach thành công!');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError('Lỗi cập nhật trạng thái thanh toán.');
    }
  };

  const toggleCoursePayment = async (id: string, currentStatus: 'Chưa thanh toán' | 'Đã thanh toán') => {
    const newStatus = currentStatus === 'Chưa thanh toán' ? 'Đã thanh toán' : 'Chưa thanh toán';
    try {
      await updateCourseRegStatus(id, newStatus);
      setCourses(courses.map(c => c.id === id ? { ...c, status: newStatus } : c));
      setSuccess('Cập nhật trạng thái thanh toán khóa học thành công!');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError('Lỗi cập nhật trạng thái thanh toán.');
    }
  };

  // --- DELETE HANDLERS ---
  const handleDeleteEbook = async (id: string) => {
    if (!window.confirm('Chị có chắc chắn muốn xóa đăng ký Ebook này không?')) return;
    try {
      await deleteEbookReg(id);
      setEbooks(ebooks.filter(e => e.id !== id));
      setSuccess('Đã xóa đăng ký Ebook.');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError('Lỗi khi xóa đăng ký.');
    }
  };

  const handleDeleteCoach = async (id: string) => {
    if (!window.confirm('Chị có chắc chắn muốn xóa đăng ký Coach này không?')) return;
    try {
      await deleteCoachReg(id);
      setCoaches(coaches.filter(c => c.id !== id));
      setSuccess('Đã xóa đăng ký Coach.');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError('Lỗi khi xóa đăng ký.');
    }
  };

  const handleDeleteGift = async (id: string) => {
    if (!window.confirm('Chị có chắc chắn muốn xóa đăng ký Quà tặng này không?')) return;
    try {
      await deleteGiftReg(id);
      setGifts(gifts.filter(g => g.id !== id));
      setSuccess('Đã xóa đăng ký Quà tặng.');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError('Lỗi khi xóa đăng ký.');
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm('Chị có chắc chắn muốn xóa đăng ký Khóa học này không?')) return;
    try {
      await deleteCourseReg(id);
      setCourses(courses.filter(c => c.id !== id));
      setSuccess('Đã xóa đăng ký Khóa học.');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError('Lỗi khi xóa đăng ký.');
    }
  };

  // --- GOOGLE SHEETS API IMPLEMENTATION ---

  // Helper to initialize tabs on Google Sheets
  const handleInitSheets = async () => {
    if (!accessToken) {
      setError('Vui lòng kết nối tài khoản Google Sheets của chị trước.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // In Google Sheets, to add sheets/tabs, we send a batchUpdate request
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
      
      // We will try to add Tab Ebook, Tab DangKyCoach, Tab QuaTang, Tab KhoaHoc. 
      // Note: If they already exist, it might throw an error. We will try to catch and proceed.
      const addTabsBody = {
        requests: [
          { addSheet: { properties: { title: 'Tab Ebook' } } },
          { addSheet: { properties: { title: 'Tab DangKyCoach' } } },
          { addSheet: { properties: { title: 'Tab QuaTang' } } },
          { addSheet: { properties: { title: 'Tab KhoaHoc' } } }
        ]
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addTabsBody)
      });

      // Whether we created sheets or they already existed, let's write headers
      const writeHeadersBody = {
        valueInputOption: 'USER_ENTERED',
        data: [
          {
            range: 'Tab Ebook!A1:E1',
            values: [["Thời gian đăng ký", "Họ và tên", "Số điện thoại Zalo", "Email", "Trạng thái thanh toán"]]
          },
          {
            range: 'Tab DangKyCoach!A1:H1',
            values: [["Thời gian đăng ký", "Họ và tên", "Số điện thoại", "Email", "Lĩnh vực hoạt động", "Khó khăn lớn nhất", "Lời nhắn/Mong muốn", "Trạng thái thanh toán"]]
          },
          {
            range: 'Tab QuaTang!A1:E1',
            values: [["Thời gian đăng ký", "Họ và tên", "Số điện thoại Zalo", "Email", "Quà tặng quan tâm nhất"]]
          },
          {
            range: 'Tab KhoaHoc!A1:H1',
            values: [["Thời gian đăng ký", "Họ và tên", "Số điện thoại Zalo", "Email", "Mã khóa học", "Tên khóa học", "Học phí", "Trạng thái thanh toán"]]
          }
        ]
      };

      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(writeHeadersBody)
      });

      setSuccess('Đã khởi tạo các Tab và tiêu đề cột trên Google Sheets thành công!');
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      console.error(err);
      setError('Lỗi khởi tạo cấu trúc Google Sheets. Đảm bảo chị đã đổi tên các Tab thành Tab Ebook, Tab DangKyCoach, Tab QuaTang.');
    } finally {
      setLoading(false);
    }
  };

  // Sync Ebooks
  const syncEbooks = async () => {
    if (!accessToken) {
      setError('Vui lòng kết nối Google bằng cách bấm nút "Kết Nối Google Sheets"');
      return;
    }
    const unsynced = ebooks.filter(e => !e.synced);
    if (unsynced.length === 0) {
      setSuccess('Tất cả đăng ký Ebook đã được đồng bộ!');
      setTimeout(() => setSuccess(null), 2000);
      return;
    }

    setLoading(true);
    try {
      const rows = unsynced.map(e => [
        new Date(e.createdAt).toLocaleString('vi-VN'),
        e.fullName,
        e.phoneZalo,
        e.email,
        e.status === 'Đã thanh toán' ? 'Đã thanh toán' : 'Chờ chuyển khoản'
      ]);

      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Tab Ebook!A:E:append?valueInputOption=USER_ENTERED`;
      const res = await fetch(appendUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: rows })
      });

      if (!res.ok) throw new Error('Append failed');

      // Update in Firestore
      for (const item of unsynced) {
        if (item.id) {
          await updateEbookRegStatus(item.id, item.status, true);
        }
      }

      setEbooks(ebooks.map(e => !e.synced ? { ...e, synced: true } : e));
      setSuccess(`Đã đồng bộ ${unsynced.length} đăng ký Ebook lên Google Sheet!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError('Lỗi đồng bộ Ebook. Chị vui lòng kiểm tra xem Google Sheet đã có Tab tên "Tab Ebook" chưa nhé.');
    } finally {
      setLoading(false);
    }
  };

  // Sync Coaches
  const syncCoaches = async () => {
    if (!accessToken) {
      setError('Vui lòng kết nối Google bằng cách bấm nút "Kết Nối Google Sheets"');
      return;
    }
    const unsynced = coaches.filter(c => !c.synced);
    if (unsynced.length === 0) {
      setSuccess('Tất cả đăng ký Coach đã được đồng bộ!');
      setTimeout(() => setSuccess(null), 2000);
      return;
    }

    setLoading(true);
    try {
      const rows = unsynced.map(c => [
        new Date(c.createdAt).toLocaleString('vi-VN'),
        c.name,
        c.phone,
        c.email,
        c.industry,
        c.biggestChallenge,
        c.message,
        c.status === 'Đã thanh toán' ? 'Đã thanh toán' : 'Chờ chuyển khoản'
      ]);

      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Tab DangKyCoach!A:H:append?valueInputOption=USER_ENTERED`;
      const res = await fetch(appendUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: rows })
      });

      if (!res.ok) throw new Error('Append failed');

      // Update in Firestore
      for (const item of unsynced) {
        if (item.id) {
          await updateCoachRegStatus(item.id, item.status, true);
        }
      }

      setCoaches(coaches.map(c => !c.synced ? { ...c, synced: true } : c));
      setSuccess(`Đã đồng bộ ${unsynced.length} đăng ký Coach lên Google Sheet!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError('Lỗi đồng bộ Coach. Chị vui lòng kiểm tra xem Google Sheet đã có Tab tên "Tab DangKyCoach" chưa nhé.');
    } finally {
      setLoading(false);
    }
  };

  // Sync Gifts
  const syncGifts = async () => {
    if (!accessToken) {
      setError('Vui lòng kết nối Google bằng cách bấm nút "Kết Nối Google Sheets"');
      return;
    }
    const unsynced = gifts.filter(g => !g.synced);
    if (unsynced.length === 0) {
      setSuccess('Tất cả đăng ký Quà tặng đã được đồng bộ!');
      setTimeout(() => setSuccess(null), 2000);
      return;
    }

    setLoading(true);
    try {
      const rows = unsynced.map(g => [
        new Date(g.createdAt).toLocaleString('vi-VN'),
        g.fullName,
        g.phoneZalo,
        g.email,
        g.selectedGift === 'all' ? 'Nhận tất cả quà tặng' : g.selectedGift
      ]);

      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Tab QuaTang!A:E:append?valueInputOption=USER_ENTERED`;
      const res = await fetch(appendUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: rows })
      });

      if (!res.ok) throw new Error('Append failed');

      // Update in Firestore
      for (const item of unsynced) {
        if (item.id) {
          await updateGiftRegSynced(item.id, true);
        }
      }

      setGifts(gifts.map(g => !g.synced ? { ...g, synced: true } : g));
      setSuccess(`Đã đồng bộ ${unsynced.length} đăng ký Quà tặng lên Google Sheet!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError('Lỗi đồng bộ Quà tặng. Chị vui lòng kiểm tra xem Google Sheet đã có Tab tên "Tab QuaTang" chưa nhé.');
    } finally {
      setLoading(false);
    }
  };

  // Sync Courses
  const syncCourses = async () => {
    if (!accessToken) {
      setError('Vui lòng kết nối Google bằng cách bấm nút "Kết Nối Google Sheets"');
      return;
    }
    const unsynced = courses.filter(c => !c.synced);
    if (unsynced.length === 0) {
      setSuccess('Tất cả đăng ký Khóa học đã được đồng bộ!');
      setTimeout(() => setSuccess(null), 2000);
      return;
    }

    setLoading(true);
    try {
      const rows = unsynced.map(c => [
        new Date(c.createdAt).toLocaleString('vi-VN'),
        c.fullName,
        c.phoneZalo,
        c.email,
        c.courseId,
        c.courseTitle,
        c.price,
        c.status === 'Đã thanh toán' ? 'Đã thanh toán' : 'Chờ chuyển khoản'
      ]);

      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Tab KhoaHoc!A:H:append?valueInputOption=USER_ENTERED`;
      const res = await fetch(appendUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: rows })
      });

      if (!res.ok) throw new Error('Append failed');

      // Update in Firestore
      for (const item of unsynced) {
        if (item.id) {
          await updateCourseRegStatus(item.id, item.status, true);
        }
      }

      setCourses(courses.map(c => !c.synced ? { ...c, synced: true } : c));
      setSuccess(`Đã đồng bộ ${unsynced.length} đăng ký Khóa học lên Google Sheet!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError('Lỗi đồng bộ Khóa học. Chị vui lòng kiểm tra xem Google Sheet đã có Tab tên "Tab KhoaHoc" chưa nhé.');
    } finally {
      setLoading(false);
    }
  };

  const syncAll = async () => {
    if (!accessToken) {
      setError('Vui lòng kết nối Google bằng cách bấm nút "Kết Nối Google Sheets"');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await Promise.all([syncEbooks(), syncCoaches(), syncGifts(), syncCourses()]);
      setSuccess('Đồng bộ toàn bộ dữ liệu mới lên tất cả các Tab thành công!');
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError('Có lỗi xảy ra trong quá trình đồng bộ tổng hợp.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="fixed inset-0 bg-[#2E2522]/80 backdrop-blur-md z-50 flex items-center justify-center">
        <div className="bg-[#FAF6F0] p-8 rounded-3xl text-center space-y-4 max-w-sm">
          <RefreshCw className="w-8 h-8 text-[#C59B27] animate-spin mx-auto" />
          <p className="text-xs font-semibold text-stone-600">Đang khởi tạo hệ thống quản trị...</p>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!user) {
    return (
      <div className="fixed inset-0 bg-[#2E2522]/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-[#FAF6F0] border border-[#EADFC9] rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 cursor-pointer"
          >
            <XCircle className="w-5 h-5" />
          </button>

          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#C59B27]/10 flex items-center justify-center mx-auto text-[#C59B27]">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#2E2522]">Hệ Thống Quản Trị Tống An</h3>
              <p className="text-xs text-[#5C4D49] leading-relaxed">
                Đăng nhập bằng tài khoản Google của chị An (<span className="font-semibold text-[#A82222]">tongthuyan676@gmail.com</span>) để đồng bộ thông tin và quản lý khách hàng.
              </p>
            </div>

            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Google GSI styled login button */}
            <button 
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-[#4285F4] hover:bg-[#357AE8] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
              Đăng nhập với Google Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#2E2522]/80 backdrop-blur-md z-50 overflow-y-auto p-4 sm:p-6 md:p-8 flex items-start justify-center">
      <div className="bg-[#FAF6F0] border border-[#EADFC9] rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden my-4">
        
        {/* Header bar */}
        <div className="bg-[#2E2522] text-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EADFC9]/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#C59B27]/20 rounded-xl text-[#C59B27]">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Hệ Thống Quản Trị Khách Hàng</h2>
              <p className="text-[10px] text-stone-400">Đăng nhập bởi: {user.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleInitSheets}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 font-semibold text-xs rounded-lg transition-all cursor-pointer border border-emerald-500/20"
              title="Khởi tạo cấu trúc Trang tính với 4 tab: Tab Ebook, Tab DangKyCoach, Tab QuaTang, Tab KhoaHoc"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Khởi tạo cấu trúc Sheet
            </button>

            <button
              onClick={syncAll}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#C59B27] hover:bg-[#A9831E] text-white font-bold text-xs rounded-lg transition-all cursor-pointer shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Đồng bộ tất cả lên Google Sheets
            </button>

            <a
              href={spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs rounded-lg border border-stone-700 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Xem Google Sheet
            </a>

            <button
              onClick={handleLogout}
              className="p-2 text-stone-400 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
              title="Đóng trang quản lý"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="bg-red-50 border-b border-red-200 text-red-600 px-6 py-3 text-xs flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </span>
            <button onClick={() => setError(null)} className="font-bold hover:underline cursor-pointer">Đóng</button>
          </div>
        )}
        {success && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-600 px-6 py-3 text-xs flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {success}
            </span>
            <button onClick={() => setSuccess(null)} className="font-bold hover:underline cursor-pointer">Đóng</button>
          </div>
        )}

        {/* Info panel */}
        <div className="p-4 bg-yellow-50 border-b border-yellow-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#5C4D49]">
          <div className="flex items-start gap-2">
            <Settings className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
            <div>
              <strong>Lưu ý đồng bộ:</strong> Đăng ký của khách hàng được lưu trữ an toàn trong cơ sở dữ liệu đám mây (Firestore) trước. Chị chỉ cần bấm "Đồng bộ" để gửi toàn bộ dữ liệu mới sang file Google Sheets một cách tập trung, nhanh chóng và không lo lỗi nghẽn mạng!
            </div>
          </div>
          {!accessToken && (
            <button 
              onClick={handleLogin}
              className="px-4 py-1.5 bg-[#4285F4] hover:bg-[#357AE8] text-white rounded-lg font-bold shrink-0 self-start md:self-auto cursor-pointer"
            >
              Kết Nối Google Sheets
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <div className="p-6 space-y-6">
          
          {/* Tabs navigation */}
          <div className="flex border-b border-stone-200">
            <button
              onClick={() => setActiveTab('ebook')}
              className={`pb-3.5 px-6 font-bold text-xs tracking-wider uppercase transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                activeTab === 'ebook'
                  ? 'border-[#C59B27] text-[#C59B27]'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Lộ trình Ebook ({ebooks.length})
            </button>
            <button
              onClick={() => setActiveTab('coach')}
              className={`pb-3.5 px-6 font-bold text-xs tracking-wider uppercase transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                activeTab === 'coach'
                  ? 'border-[#C59B27] text-[#C59B27]'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Đăng ký Coach ({coaches.length})
            </button>
            <button
              onClick={() => setActiveTab('gifts')}
              className={`pb-3.5 px-6 font-bold text-xs tracking-wider uppercase transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                activeTab === 'gifts'
                  ? 'border-[#C59B27] text-[#C59B27]'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              <Gift className="w-4 h-4" />
              Đăng ký Quà tặng ({gifts.length})
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`pb-3.5 px-6 font-bold text-xs tracking-wider uppercase transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                activeTab === 'courses'
                  ? 'border-[#C59B27] text-[#C59B27]'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              <Video className="w-4 h-4" />
              Đăng ký Khóa học ({courses.length})
            </button>
          </div>

          {/* Tab content panels */}
          <div className="bg-white rounded-2xl border border-[#EADFC9]/60 shadow-xs overflow-hidden">
            
            {/* EBOOK REGISTRATIONS TAB */}
            {activeTab === 'ebook' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] text-stone-500 font-bold text-[10px] uppercase tracking-wider border-b border-[#EADFC9]/30">
                      <th className="p-4">Họ & tên</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Số điện thoại / Zalo</th>
                      <th className="p-4">Thanh toán (199k)</th>
                      <th className="p-4">Ngày đăng ký</th>
                      <th className="p-4 text-center">Google Sheets</th>
                      <th className="p-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs text-[#2E2522]">
                    {ebooks.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-12 text-center text-stone-400">
                          Chưa có lượt đăng ký nhận Ebook nào trong cơ sở dữ liệu.
                        </td>
                      </tr>
                    ) : (
                      ebooks.map((e) => (
                        <tr key={e.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                          <td className="p-4 font-bold">{e.fullName}</td>
                          <td className="p-4 text-stone-500">{e.email}</td>
                          <td className="p-4 font-mono font-semibold">{e.phoneZalo}</td>
                          <td className="p-4">
                            <button
                              onClick={() => e.id && toggleEbookPayment(e.id, e.status)}
                              className={`px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1 ${
                                e.status === 'Đã thanh toán'
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${e.status === 'Đã thanh toán' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              {e.status}
                            </button>
                          </td>
                          <td className="p-4 text-stone-400">
                            {new Date(e.createdAt).toLocaleString('vi-VN')}
                          </td>
                          <td className="p-4 text-center">
                            {e.synced ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                <Check className="w-3 h-3" /> Đã đồng bộ
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-500 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-200">
                                Chưa đồng bộ
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => e.id && handleDeleteEbook(e.id)}
                              className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Xóa dòng"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* COACH REGISTRATIONS TAB */}
            {activeTab === 'coach' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] text-stone-500 font-bold text-[10px] uppercase tracking-wider border-b border-[#EADFC9]/30">
                      <th className="p-4">Khách hàng</th>
                      <th className="p-4">Thông tin liên hệ</th>
                      <th className="p-4">Lĩnh vực & Khó khăn</th>
                      <th className="p-4">Lời nhắn</th>
                      <th className="p-4">Thanh toán (199k)</th>
                      <th className="p-4">Ngày đăng ký</th>
                      <th className="p-4 text-center">Google Sheets</th>
                      <th className="p-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs text-[#2E2522]">
                    {coaches.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-12 text-center text-stone-400">
                          Chưa có lượt đăng ký tư vấn Coach 1-1 nào trong cơ sở dữ liệu.
                        </td>
                      </tr>
                    ) : (
                      coaches.map((c) => (
                        <tr key={c.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                          <td className="p-4">
                            <div className="font-bold">{c.name}</div>
                          </td>
                          <td className="p-4 space-y-1">
                            <div className="font-mono font-semibold">{c.phone}</div>
                            <div className="text-[10px] text-stone-400">{c.email}</div>
                          </td>
                          <td className="p-4 max-w-xs space-y-1">
                            <div><span className="text-[10px] font-bold text-[#C59B27] uppercase">Lĩnh vực:</span> {c.industry}</div>
                            <div className="text-stone-500 line-clamp-2"><span className="text-[10px] font-bold text-[#A82222] uppercase">Khó khăn:</span> {c.biggestChallenge}</div>
                          </td>
                          <td className="p-4 max-w-xs text-stone-500 italic line-clamp-2">
                            {c.message || 'Không có lời nhắn'}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => c.id && toggleCoachPayment(c.id, c.status)}
                              className={`px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1 ${
                                c.status === 'Đã thanh toán'
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'Đã thanh toán' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              {c.status}
                            </button>
                          </td>
                          <td className="p-4 text-stone-400">
                            {new Date(c.createdAt).toLocaleString('vi-VN')}
                          </td>
                          <td className="p-4 text-center">
                            {c.synced ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                <Check className="w-3 h-3" /> Đã đồng bộ
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-500 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-200">
                                Chưa đồng bộ
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => c.id && handleDeleteCoach(c.id)}
                              className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Xóa dòng"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* GIFT REGISTRATIONS TAB */}
            {activeTab === 'gifts' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] text-stone-500 font-bold text-[10px] uppercase tracking-wider border-b border-[#EADFC9]/30">
                      <th className="p-4">Họ & tên</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Số điện thoại / Zalo</th>
                      <th className="p-4">Quà tặng lựa chọn</th>
                      <th className="p-4">Ngày đăng ký</th>
                      <th className="p-4 text-center">Google Sheets</th>
                      <th className="p-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs text-[#2E2522]">
                    {gifts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-12 text-center text-stone-400">
                          Chưa có lượt đăng ký nhận Quà tặng miễn phí nào trong cơ sở dữ liệu.
                        </td>
                      </tr>
                    ) : (
                      gifts.map((g) => (
                        <tr key={g.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                          <td className="p-4 font-bold">{g.fullName}</td>
                          <td className="p-4 text-stone-500">{g.email}</td>
                          <td className="p-4 font-mono font-semibold">{g.phoneZalo}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg font-medium text-[10px] border border-purple-100 flex items-center gap-1 w-max">
                              <Sparkles className="w-3 h-3 text-purple-500" />
                              {g.selectedGift === 'all' ? 'Nhận tất cả quà tặng' : g.selectedGift}
                            </span>
                          </td>
                          <td className="p-4 text-stone-400">
                            {new Date(g.createdAt).toLocaleString('vi-VN')}
                          </td>
                          <td className="p-4 text-center">
                            {g.synced ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                <Check className="w-3 h-3" /> Đã đồng bộ
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-500 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-200">
                                Chưa đồng bộ
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => g.id && handleDeleteGift(g.id)}
                              className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Xóa dòng"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* COURSE REGISTRATIONS TAB */}
            {activeTab === 'courses' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] text-stone-500 font-bold text-[10px] uppercase tracking-wider border-b border-[#EADFC9]/30">
                      <th className="p-4">Khách hàng</th>
                      <th className="p-4">Khóa học đăng ký</th>
                      <th className="p-4">Học phí</th>
                      <th className="p-4">Thanh toán</th>
                      <th className="p-4">Ngày đăng ký</th>
                      <th className="p-4 text-center">Google Sheets</th>
                      <th className="p-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-xs text-[#2E2522]">
                    {courses.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-12 text-center text-stone-400">
                          Chưa có lượt đăng ký mua Khóa học nào trong cơ sở dữ liệu.
                        </td>
                      </tr>
                    ) : (
                      courses.map((c) => (
                        <tr key={c.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                          <td className="p-4 space-y-1">
                            <div className="font-bold">{c.fullName}</div>
                            <div className="text-[10px] text-stone-500">Email: {c.email}</div>
                            <div className="text-[10px] text-stone-400">Zalo: <span className="font-mono font-semibold text-stone-600">{c.phoneZalo}</span></div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-stone-800">{c.courseTitle}</div>
                            <div className="text-[10px] text-[#A82222]">ID: {c.courseId}</div>
                          </td>
                          <td className="p-4 font-mono font-semibold text-stone-700">
                            {c.price}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => c.id && toggleCoursePayment(c.id, c.status)}
                              className={`px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1 ${
                                c.status === 'Đã thanh toán'
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'Đã thanh toán' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              {c.status}
                            </button>
                          </td>
                          <td className="p-4 text-stone-400">
                            {new Date(c.createdAt).toLocaleString('vi-VN')}
                          </td>
                          <td className="p-4 text-center">
                            {c.synced ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                <Check className="w-3 h-3" /> Đã đồng bộ
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-500 bg-stone-50 px-2.5 py-1 rounded-full border border-stone-200">
                                Chưa đồng bộ
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => c.id && handleDeleteCourse(c.id)}
                              className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Xóa dòng"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

          </div>

          {/* Quick instructions block */}
          <div className="p-6 bg-stone-100 rounded-2xl border border-stone-200 space-y-3">
            <h4 className="text-xs font-bold text-[#2E2522] uppercase tracking-wide">Hướng dẫn mở rộng nâng cao (Google Apps Script):</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Nếu chị muốn dữ liệu tự động đồng bộ sang Google Sheets <strong>ngay lập tức trong nền</strong> khi khách hàng đăng ký mà không cần bấm nút thủ công tại đây, chị hãy cài đặt Apps Script bằng cách mở Google Sheets của chị, chọn <strong>Extensions &gt; Apps Script</strong>, dán đoạn mã sau vào và triển khai (Deploy) dưới dạng Web App (mọi người đều có quyền truy cập). Sau đó liên hệ kỹ thuật để cấu hình liên kết cực kỳ dễ dàng!
            </p>
            <pre className="p-4 bg-stone-800 text-stone-200 text-[10px] rounded-xl font-mono overflow-x-auto max-h-40">
{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var data = JSON.parse(e.postData.contents);
  var targetTabName = data.tabName; // "Tab Ebook", "Tab DangKyCoach", "Tab QuaTang", "Tab KhoaHoc"
  var targetSheet = sheet.getSheetByName(targetTabName);
  if (!targetSheet) {
    targetSheet = sheet.insertSheet(targetTabName);
  }
  targetSheet.appendRow(data.rowValues);
  return ContentService.createTextOutput(JSON.stringify({status: "success"})).setMimeType(ContentService.MimeType.JSON);
}`}
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
}
