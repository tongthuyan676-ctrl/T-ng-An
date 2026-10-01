/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EbookChapter {
  id: string;
  title: string;
  subtitle?: string;
  sections: {
    heading: string;
    content: string[];
    prompts?: { title: string; prompt: string }[];
    tables?: { headers: string[]; rows: string[][] }[];
    callouts?: string[];
  }[];
}

export const FULL_EBOOK_INFO = {
  title: 'VẬN HÀNH DOANH NGHIỆP 1 NGƯỜI BẰNG AI',
  subtitle: 'Cẩm Nang Thực Chiến Dành Cho Nhà Bán Hàng Vật Lý & Xây Dựng Thương Hiệu Cá Nhân',
  author: 'Coach Tống An',
  authorTitle: 'Chuyên gia Đào tạo Con người & Cố vấn Phát triển Sự nghiệp',
  totalPages: 38,
  googleSheetsUrl1: 'https://docs.google.com/spreadsheets/d/1fdV5WQpuOzy6bXDy2eerwwpvZBdJbVpHOpsKwhAFHMw/edit?gid=2127812128#gid=2127812128',
  googleSheetsUrl2: 'https://docs.google.com/spreadsheets/d/1stK_-SH6Vvg6ASZnrWZ3TPLWIy3evsMrF0SqCgB0Gxo/edit?gid=301116931#gid=301116931',
  zaloCommunityUrl: 'https://zalo.me/g/fsuvf5aok5adpz7krl1b',
  downloadPdfPath: '/ebook-van-hanh-doanh-nghiep-1-nguoi-bang-ai.html'
};

export const EBOOK_CHAPTERS: EbookChapter[] = [
  {
    id: 'loi-noi-dau',
    title: 'LỜI NÓI ĐẦU',
    sections: [
      {
        heading: 'Chào mừng bạn đến với kỷ nguyên Solopreneur AI',
        content: [
          'Chào bạn đến với cẩm nang thực chiến vận hành doanh nghiệp 1 người bằng AI dành riêng cho nhà bán hàng vật lý và xây dựng thương hiệu cá nhân.',
          'Trong kỷ nguyên AI, quy mô doanh nghiệp không nằm ở số lượng nhân sự cồng kềnh, mà nằm ở tốc độ tự động hóa, tối ưu hóa hệ thống và sức mạnh định vị của chính bạn. Cuốn cẩm nang này sẽ đồng hành cùng bạn giải phóng thời gian và bứt phá doanh thu.'
        ],
        callouts: [
          '🌟 Quy mô doanh nghiệp hiện đại không đo bằng số nhân sự, mà đo bằng năng lực tự động hóa hệ thống và sức mạnh nhân hiệu của người làm chủ!'
        ]
      }
    ]
  },
  {
    id: 'chuong-1',
    title: 'CHƯƠNG 1: TỔNG QUAN SOLOPRENEUR & SỨC MẠNH AI TRONG KINH DOANH VẬT LÝ',
    subtitle: 'Chuyển từ "Thợ làm thuê cho chính mình" sang "Nhà điều hành hệ thống"',
    sections: [
      {
        heading: 'I. Tư duy nền tảng — Thoát khỏi cái bẫy "Tự làm tất cả mọi thứ" (Do-It-All Trap)',
        content: [
          'Hầu hết các chị em khi mới bắt đầu kinh doanh sản phẩm vật lý (quần áo, mỹ phẩm, đồ gia dụng, thực phẩm...) thường rơi vào cái bẫy "Tự làm tất cả mọi thứ" (Do-It-All Trap):',
          '• Sáng nhập hàng, kiểm kho.',
          '• Trưa đóng gói, đi gửi bưu điện.',
          '• Chiều chụp ảnh sản phẩm, viết bài đăng Facebook, dựng video TikTok.',
          '• Tối mịt ngồi trả lời tin nhắn khách hàng, chốt đơn và đối soát dòng tiền.',
          '👉 Hậu quả: Kiệt sức (Burnout), thời gian dành cho gia đình và bản thân không còn, nhưng doanh thu thì giậm chân tại chỗ vì quỹ thời gian một ngày chỉ có 24 tiếng.',
          'Định nghĩa Solopreneur trong kỷ nguyên AI: Solopreneur không có nghĩa là bạn phải làm mọi việc bằng sức người. Solopreneur hiện đại là người làm chủ một doanh nghiệp tinh gọn, nơi bạn giữ vai trò Kiến trúc sư trưởng & Giám đốc chiến lược; toàn bộ các công việc lặp đi lặp lại được giao phó cho Hệ thống tự động hóa và Trợ lý AI.',
          'Mục tiêu chuyển hóa: Giải phóng ít nhất 80% thời gian cho các công việc thủ công. Xây dựng tư duy vận hành: Không làm việc bằng sức trâu, hãy làm việc bằng hệ thống.'
        ]
      },
      {
        heading: 'II. Kiểm toán thời gian cá nhân (Time Audit) và loại bỏ điểm nghẽn',
        content: [
          'Trước khi muốn tối ưu hóa bằng công nghệ, bạn phải biết chính xác thời gian của mình đang bị "rò rỉ" ở đâu:',
          '• Bước 1: Nhật ký hành động 3 ngày liên tục. Ghi chép từng khung giờ (08:00 - 09:30 chụp ảnh, 09:30 - 11:00 nghĩ caption, 14:00 - 16:00 đóng đơn...).',
          '• Bước 2: Phân loại công việc theo ma trận 3 nhóm (A - B - C):',
          '  + Nhóm A (Tạo ra tiền trực tiếp): Livestream, chốt đơn, tư vấn khách VIP, đàm phán nhập hàng (Giữ lại & tối ưu).',
          '  + Nhóm B (Hỗ trợ vận hành): Đóng gói, in vận đơn, đối soát tiền bạc (Tối ưu quy trình hoặc thuê ngoài bán thời gian).',
          '  + Nhóm C (Tiêu tốn thời gian, ít sinh tiền): Suy nghĩ ý tưởng content, chỉnh sửa ảnh thô, thiết kế banner, tìm kiếm hashtag (Chuyển giao 100% cho AI).',
          '• Bước 3: Lập "Danh sách tử thần" cần cắt bỏ ngay. Khoanh tròn toàn bộ công việc nhóm C và thay thế bằng AI.'
        ]
      },
      {
        heading: 'III. Thiết lập "Đội ngũ AI" ảo cho doanh nghiệp 1 người',
        content: [
          'Thay vì tốn hàng chục triệu đồng thuê một đội ngũ nhân sự marketing cồng kềnh, bạn sẽ thiết lập ngay một "ban giám đốc ảo" bằng các công cụ AI:',
          '1. ChatGPT / Claude — Trưởng phòng Marketing & Sáng tạo Nội dung: Lên ý tưởng chiến lược, viết bài PR, kịch bản video ngắn, viết email chăm sóc khách hàng, kịch bản tin nhắn.',
          '2. Canva AI — Giám đốc Thiết kế (Art Director): Thiết kế banner quảng cáo, poster khai giảng, ảnh ghép sản phẩm vật lý, tạo ảnh nền bắt mắt chỉ trong 30 giây.',
          '3. Notion AI — Thư ký Vận hành & Quản lý Kho: Quản lý danh mục sản phẩm, lịch đăng bài, lưu trữ quy trình chuẩn SOP, quản lý khách hàng và đơn hàng.'
        ]
      },
      {
        heading: 'IV. Tư duy điều hành & nghệ thuật "ra lệnh" cho AI',
        content: [
          'Sai lầm lớn nhất của người mới dùng AI là đưa ra câu lệnh quá ngắn gọn ("Viết bài bán áo đi"), dẫn đến kết quả hời hợt rồi vội kết luận AI vô dụng.',
          '1. Chuyển từ vị thế "Người làm" sang "Người kiểm duyệt (Editor)": Bạn không tự viết từ dấu chấm đầu tiên. Bạn yêu cầu AI viết 3-5 phương án, chọn phương án tốt nhất rồi thêm cảm xúc thật và giọng văn của bạn.',
          '2. Công thức tiêu chuẩn để ra lệnh cho AI (Prompt Framework):',
          '  • Vai trò (Role): Bạn muốn AI đóng vai ai? (Chuyên gia marketing, chuyên gia tâm lý...).',
          '  • Bối cảnh (Context): Bối cảnh kinh doanh hiện tại của bạn là gì? (Bán hàng vật lý, khách bận rộn...).',
          '  • Nhiệm vụ cụ thể (Task): Cần AI làm chính xác việc gì? (Viết bài AIDA, kịch bản...).',
          '  • Đầu ra mong muốn (Output): Hình thức trình bày ra sao? (Dài bao nhiêu chữ, văn phong thế nào...).'
        ]
      },
      {
        heading: 'V. Xây dựng quy trình làm việc hàng ngày (Daily SOP) của Solopreneur',
        content: [
          'Lịch trình mẫu tối ưu một ngày của Solopreneur khi có AI trợ lý:',
          '🌅 Buổi sáng (08:00 - 10:00): Chiến lược & Sáng tạo cùng AI (ChatGPT lên ý tưởng + Canva AI làm hình + Lên lịch tự động đăng đa kênh).',
          '☀️ Buổi trưa & Chiều (10:00 - 16:00): Vận hành & Kinh doanh cốt lõi (Xử lý đơn hàng, kho, đóng gói, livestream hoặc tư vấn khách).',
          '🌆 Buổi tối (20:00 - 21:00): Tối ưu & Tổng kết (Notion AI xem báo cáo công việc, lên kế hoạch mai, tắt máy nghỉ ngơi trọn vẹn bên gia đình).'
        ]
      }
    ]
  },
  {
    id: 'chuong-2',
    title: 'CHƯƠNG 2: XÂY DỰNG THƯƠNG HIỆU CÁ NHÂN ĐỂ BÁN HÀNG VẬT LÝ',
    subtitle: 'Biến trang cá nhân thành cỗ máy nam châm hút khách tự nhiên',
    sections: [
      {
        heading: 'I. Tư duy nền tảng — Tại sao bán hàng vật lý nhất định phải có thương hiệu cá nhân?',
        content: [
          '1. Cái bẫy "Cạnh tranh về giá" trên thị trường E-commerce: Nếu chỉ nhập hàng về bán lại, bạn sẽ rơi vào cuộc chiến phá giá khốc liệt với hàng nghìn đối thủ. Khách hàng không trung thành với bạn; họ chỉ mua nơi nào rẻ hơn vài nghìn đồng.',
          '2. Sức mạnh của "Nhân hiệu gắn liền với Sản phẩm vật lý": Người ta có thể quên tên một shop online vô danh, nhưng sẽ nhớ và tin tưởng một con người cụ thể. Bạn không chỉ bán cái áo hay hũ mỹ phẩm, mà đang bán sự uy tín, phong cách sống và niềm tin. Lúc này giá không còn là rào cản lớn nhất nữa.',
          '3. Mục tiêu: Biến trang cá nhân thành nam châm hút khách tự nhiên (Inbound Leads), giảm thiểu chi phí quảng cáo.'
        ]
      },
      {
        heading: 'II. Xác định định vị và ngách sản phẩm vật lý độc quyền',
        content: [
          'Đừng cố bán mọi thứ cho tất cả mọi người. Hãy chọn đúng ngách mà bản thân có thế mạnh và đam mê.',
          '1. Công thức 3 vòng tròn định vị cá nhân:',
          '  • Bạn là ai? (Thế mạnh, phong cách: phụ nữ độc lập, mẹ bỉm tinh tế...).',
          '  • Khách hàng của bạn là ai? (Ai cần sản phẩm của bạn nhất: phụ nữ công sở 25-40 tuổi...).',
          '  • Sản phẩm vật lý nào giải quyết đúng nỗi đau của họ? (Thời trang thiết kế không nhăn, đồ gia dụng tiết kiệm thời gian...).',
          '2. Định vị hình ảnh nhất quán (Visual Branding):',
          '  • Ảnh đại diện & Ảnh bìa: Chuyên nghiệp, thể hiện phong thái trí tuệ, gần gũi.',
          '  • Tiểu sử (Bio): Trả lời 3 câu hỏi ngay lập tức: Bạn giúp ai? Giải quyết vấn đề gì? Sản phẩm chủ lực là gì?'
        ]
      },
      {
        heading: 'III. Công thức "Hook - Story - Offer" trong từng nội dung',
        content: [
          '1. H - HOOK (3 giây đầu tiên / Tiêu đề gây chú ý): Nếu 3 giây đầu không chạm vào cảm xúc, khách sẽ lướt qua.',
          '   • Ví dụ sai: "Hôm nay shop về mẫu áo mới mời mọi người mua" (nhạt nhẽo).',
          '   • Ví dụ đúng: "3 sai lầm khiến phụ nữ công sở luôn thấy mình không có gì để mặc mỗi sáng dù tủ quần áo chật ních."',
          '2. S - STORY (Kể chuyện & Chạm nỗi đau): Dùng câu chuyện thực tế của bản thân hoặc khách hàng cũ để minh chứng, chia sẻ cách sản phẩm đã giải quyết vấn đề.',
          '3. O - OFFER (Lời kêu gọi hành động chuyển đổi): Đưa ra ưu đãi rõ ràng, kêu gọi bấm link giỏ hàng hoặc nhắn tin nhận mã ưu đãi giới hạn.'
        ]
      },
      {
        heading: 'IV. Chiến lược sản xuất nội dung tự động & Phủ sóng đa nền tảng',
        content: [
          '1. Tỷ lệ vàng 80/20:',
          '   • 80% Nội dung Giá trị & Xây nhân hiệu (Kiến thức, câu chuyện vượt khó, hậu trường).',
          '   • 20% Nội dung Bán hàng trực tiếp (Giới thiệu sản phẩm, khuyến mại, feedback).',
          '2. Chiến lược Repurpose ("Làm một lần, dùng mọi nơi"):',
          '   • Bước 1: Quay 1 video ngắn dưới 90 giây.',
          '   • Bước 2: Dùng AI trích xuất nội dung thành 1 bài viết Facebook dài sâu sắc.',
          '   • Bước 3: Phủ sóng cùng lúc: Video lên TikTok, YouTube Shorts, Facebook Reels, Zalo Status; Bài viết lên Fanpage và Profile cá nhân.',
          '   • Kết quả: Chỉ với 30 phút buổi sáng, bạn xuất hiện đồng thời trên mọi kênh hút traffic đa chiều!'
        ]
      }
    ]
  },
  {
    id: 'chuong-3',
    title: 'CHƯƠNG 3: BỘ PROMPT ĐỈNH CAO CHO E-COMMERCE & SOLOPRENEUR',
    subtitle: 'Kho câu lệnh PRED Framework thực chiến biến AI thành trợ lý đắc lực',
    sections: [
      {
        heading: 'I. Nghệ thuật giao việc cho AI — Công thức PRED Framework',
        content: [
          'Để AI biến thành một chuyên gia thực thụ, mỗi câu lệnh cần đủ 4 yếu tố PRED:',
          '• P - Personas (Vai trò): Gán cho AI vị trí chuyên gia cụ thể.',
          '• R - Rule & Context (Quy tắc & Bối cảnh): Bối cảnh kinh doanh, khách hàng mục tiêu, quy tắc văn phong.',
          '• E - Execution Task (Nhiệm vụ cụ thể): Yêu cầu chính xác AI cần làm việc gì.',
          '• D - Deliverable Format (Hình thức đầu ra): Cấu trúc, gạch đầu dòng, giới hạn số từ.'
        ]
      },
      {
        heading: 'II. Bộ Prompt Viết Content Bán Hàng AIDA (Facebook / Zalo)',
        content: [
          'Tạo ra những bài viết bán hàng chạm đến cảm xúc, không bị mang cảm giác chèo kéo thô thiển.'
        ],
        prompts: [
          {
            title: 'Prompt Content AIDA Bán Hàng',
            prompt: 'Đóng vai trò là một Chuyên gia Copywriting hàng đầu về thương mại điện tử và xây dựng thương hiệu cá nhân. Hãy viết cho tôi một bài đăng Facebook dài theo cấu trúc AIDA để bán sản phẩm vật lý là [Điền tên sản phẩm, ví dụ: Áo sơ mi thiết kế chống nhăn cao cấp] dành cho đối tượng khách hàng mục tiêu là [Ví dụ: Phụ nữ công sở bận rộn từ 28-45 tuổi]. Yêu cầu chi tiết: - A (Attention): Tiêu đề mở đầu cực mạnh, chạm thẳng vào nỗi đau lớn nhất của họ (ví dụ: mất tự tin vì trang phục nhăn nhúm, không có thời gian ủi đồ mỗi sáng). - I (Interest): Kể một câu chuyện ngắn hoặc tình huống thực tế đồng cảm. - D (Desire): Nêu bật các tính năng ưu việt, chất liệu, lợi ích độc quyền của sản phẩm giúp họ giải quyết triệt để vấn đề. - A (Action): Kêu gọi hành động mạnh mẽ kèm ưu đãi giới hạn cho người mua sớm nhất. - Văn phong: Gần gũi, chân thành, sắc sảo và truyền cảm hứng đúng chất Coach Tống An.'
          }
        ]
      },
      {
        heading: 'III. Bộ Prompt Tạo Kịch Bản Video Ngắn Triệu View (TikTok / Reels / Shorts)',
        content: [
          'Thiết kế chuỗi kịch bản video ngắn dưới 60 giây giữ chân khán giả từ 3 giây đầu tiên.'
        ],
        prompts: [
          {
            title: 'Prompt Kịch Bản Video Ngắn Triệu View',
            prompt: 'Đóng vai là một Nhà sáng tạo nội dung triệu view trên TikTok chuyên về mảng bán hàng vật lý. Hãy thiết kế cho tôi 3 ý tưởng kịch bản video ngắn (dưới 60 giây) cho sản phẩm [Điền tên sản phẩm của bạn]. Mỗi kịch bản bắt buộc phải tuân theo cấu trúc sau: 1. Hook (0 - 3 giây đầu): Câu nói hoặc hành động gây sốc, tò mò hoặc chạm đúng tử huyệt để giữ chân người xem không lướt đi. 2. Body (3 - 40 giây): Giải quyết vấn đề, demo trực quan tính năng ưu việt của sản phẩm một cách chân thực nhất. 3. Call-to-Action (10 giây cuối): Kêu gọi người xem bấm vào giỏ hàng hoặc nhắn tin để nhận ưu đãi ngay. Trình bày kết quả rõ ràng theo từng kịch bản, kèm theo gợi ý bối cảnh quay (Visual cue) cụ thể.'
          }
        ]
      },
      {
        heading: 'IV. Bộ Prompt Xử Lý Từ Chối & Kịch Bản Chăm Sóc Khách Hàng (Chatbot / Inbox)',
        content: [
          'Hóa giải 5 lời từ chối phổ biến nhất của người mua: Giá cao, sợ không vừa size/không giống hình, để suy nghĩ thêm, phí ship cao, khác biệt với shop khác.'
        ],
        prompts: [
          {
            title: 'Prompt Xử Lý 5 Lời Từ Chối Mua Hàng',
            prompt: 'Đóng vai là một Trưởng phòng Chăm sóc Khách hàng cao cấp, có kỹ năng thấu cảm và chốt đơn đỉnh cao. Hãy giúp tôi soạn 5 mẫu câu trả lời tin nhắn (Inbox template) để xử lý 5 lời từ chối phổ biến nhất của khách hàng khi mua sản phẩm vật lý [Điền tên sản phẩm]: 1. "Sao giá cao thế/ Đắt thế em?" 2. "Chị sợ mua online mặc không vừa size / không giống hình." 3. "Để chị suy nghĩ thêm rồi nhắn lại sau nhé." 4. "Phí ship cao quá, có được freeship không em?" 5. "Sản phẩm này có gì khác biệt so với các shop khác?" Yêu cầu: Câu trả lời phải mềm mỏng, giải tỏa nỗi lo ngay lập tức, đồng thời khéo léo chốt đơn hoặc mời khách vào danh sách ưu đãi.'
          }
        ]
      },
      {
        heading: 'V. Bộ Prompt Lập Kế Hoạch Nội Dung 30 Ngày Cho Solopreneur',
        content: [
          'Gói gọn lịch trình biên tập nội dung cả tháng chỉ trong 1 phút bằng bảng ma trận đa kênh.'
        ],
        prompts: [
          {
            title: 'Prompt Lập Bảng Ma Trận Content 30 Ngày',
            prompt: 'Đóng vai là một Giám đốc Chiến lược Marketing kỳ cựu. Hãy lập cho tôi một Bảng kế hoạch nội dung chi tiết 30 ngày trên mạng xã hội nhằm xây dựng thương hiệu cá nhân và bán sản phẩm vật lý [Điền tên sản phẩm của bạn] cho tệp khách hàng [Điền tệp khách hàng mục tiêu]. Yêu cầu cấu trúc đầu ra trình bày dưới dạng bảng gồm các cột: - Ngày (Từ Ngày 1 đến Ngày 30) - Giai đoạn phễu (Thu hút / Nuôi dưỡng / Bán hàng) - Chủ đề nội dung cụ thể (Topic) - Định dạng (Bài viết dài / Video ngắn / Livestream / Story) Đảm bảo tỷ lệ 80% nội dung giá trị/nhân hiệu và 20% nội dung bán hàng trực tiếp.'
          }
        ]
      }
    ]
  },
  {
    id: 'chuong-4',
    title: 'CHƯƠNG 4: CHECKLIST 90 NGÀY HÀNH ĐỘNG THỰC CHIẾN',
    subtitle: 'Lộ trình từng ngày cầm tay chỉ việc từ Ngày 1 đến Ngày 90',
    sections: [
      {
        heading: 'I. Tổng quan lộ trình 90 ngày và tối ưu hóa mục tiêu',
        content: [
          '• Tháng 1 (Ngày 1 - 30): Thiết lập nền tảng, hoàn thiện định vị & làm quen hệ thống AI.',
          '• Tháng 2 (Ngày 31 - 60): Tự động hóa, phễu bán hàng & tăng tốc tương tác.',
          '• Tháng 3 (Ngày 61 - 90): Bứt phá doanh thu, tối ưu chuyển đổi & nhân bản quy mô.',
          'Quy tắc thực thi cốt lõi: Kỷ luật hơn động lực; Tận dụng tối đa AI cho mọi khâu phác thảo; Đo lường hiệu quả mỗi tuần.'
        ]
      },
      {
        heading: 'II. Giai đoạn 1 (Ngày 1 - Ngày 30) — Thiết lập nền tảng & Tối ưu hồ sơ',
        content: [
          '• Tuần 1 (Ngày 1 - 7): Tối ưu hóa hồ sơ & Chọn sản phẩm phễu (Kiểm toán danh mục, viết Bio chuẩn, thay ảnh đại diện/bìa, thiết lập AI workspace, lập 30 chủ đề đầu tiên).',
          '• Tuần 2 & 3 (Ngày 8 - 21): Sản xuất chuỗi nội dung "Làm ấm" kênh (Mỗi ngày 1 bài/video giá trị, ứng dụng bộ Prompt review sản phẩm).',
          '• Tuần 4 (Ngày 22 - 30): Thiết lập phễu thu hút đầu tiên (Tạo Ebook/voucher quà tặng, kéo khách vào nhóm Zalo nội bộ).'
        ]
      },
      {
        heading: 'III. Giai đoạn 2 (Ngày 31 - Ngày 60) — Tự động hóa & Vận hành phễu bán hàng',
        content: [
          '• Tuần 5 (Ngày 31 - 37): Chuẩn hóa kịch bản chăm sóc & Chốt đơn (10 kịch bản từ chối, tin nhắn chào mừng tự động).',
          '• Tuần 6 & 7 (Ngày 38 - 51): Đẩy mạnh video ngắn Hook 3 giây & Thực hiện các phiên Livestream bán hàng.',
          '• Tuần 8 (Ngày 52 - 60): Tối ưu quy trình đóng gói & Vận chuyển (Thêm thiệp cảm ơn, QR code hướng dẫn, lọc ra nội dung chuyển đổi cao nhất).'
        ]
      },
      {
        heading: 'IV. Giai đoạn 3 (Ngày 61 - Ngày 90) — Bứt phá doanh thu & Tối ưu hệ thống',
        content: [
          '• Tuần 9 & 10 (Ngày 61 - 74): Chiến dịch bùng nổ doanh số (Sales Campaign: Flash Sale, ưu đãi cho khách cũ).',
          '• Tuần 11 (Ngày 75 - 81): Tối ưu hóa & Nhân bản top 5 video/bài viết hiệu quả nhất.',
          '• Tuần 12 (Ngày 82 - 90): Tổng kết tài chính, đóng gói SOP quy trình lên Notion và chuẩn bị chu kỳ tiếp theo.'
        ]
      }
    ]
  },
  {
    id: 'phu-luc',
    title: 'PHỤ LỤC HÌNH ẢNH MINH HỌA & FILE QUẢN LÝ TIỆN ÍCH',
    subtitle: 'Các bảng mẫu, biểu đồ phễu và liên kết Google Sheets trực tiếp',
    sections: [
      {
        heading: 'Phụ Lục 1: Sơ đồ tư duy tổng quan 3 giai đoạn 90 ngày',
        content: [
          '• Giai đoạn 1 (Ngày 1-30): Thiết lập nền tảng & Tối ưu hồ sơ (Setup & Branding)',
          '• Giai đoạn 2 (Ngày 31-60): Tự động hóa & Vận hành phễu (Automation & Funnel)',
          '• Giai đoạn 3 (Ngày 61-90): Bứt phá doanh thu & Nhân bản hệ thống (Scale & Profit)'
        ]
      },
      {
        heading: 'Phụ Lục 2: File Google Sheets Workspace: 90-DAY SOLOPRENEUR MASTER SYSTEM',
        content: [
          'Tác giả Coach Tống An đã tích hợp sẵn bảng tính Google Sheets quản lý công việc hàng ngày gồm các cột: Task, AI Tool Used, Status (Đang làm / Đã hoàn thành / Cần tối ưu), Notes.',
          'Chị hãy mở liên kết bên dưới để sao chép vào Google Drive của mình:'
        ],
        callouts: [
          '📊 Link Google Sheets Master: https://docs.google.com/spreadsheets/d/1fdV5WQpuOzy6bXDy2eerwwpvZBdJbVpHOpsKwhAFHMw/edit?gid=2127812128#gid=2127812128',
          '📈 Link Google Sheets Tracker Bổ Trợ: https://docs.google.com/spreadsheets/d/1stK_-SH6Vvg6ASZnrWZ3TPLWIy3evsMrF0SqCgB0Gxo/edit?gid=301116931#gid=301116931'
        ]
      },
      {
        heading: 'Phụ Lục 3: Biểu đồ phễu chuyển đổi E-commerce & Nhân hiệu',
        content: [
          '• Top of Funnel (Đỉnh phễu): Video ngắn / Bài viết Hook thu hút hàng nghìn người xem tự nhiên.',
          '• Middle of Funnel (Giữa phễu): Nhóm Zalo / Ebook tặng kèm / Livestream tương tác sâu.',
          '• Bottom of Funnel (Đáy phễu): Chốt đơn sản phẩm vật lý chủ lực & Đăng ký gói đồng hành dài hạn.'
        ]
      }
    ]
  }
];
