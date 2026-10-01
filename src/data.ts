/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, RoadmapStep, Testimonial, SocialChannel, GiftItem, Course } from './types';

export const HERO_DATA = {
  title: 'TỐNG AN',
  subtitle: 'Đồng hành cùng bạn xây kênh online bền vững',
  description: 'Ứng dụng AI, nội dung và chiến lược marketing để biến kênh cá nhân thành tài sản bán hàng.',
  ctaConsult: 'Đăng ký tư vấn',
  ctaGift: 'Nhận quà tặng miễn phí',
  placeholderNotice: 'Cần bổ sung ảnh chân dung thật của An'
};

export const ABOUT_DATA = {
  title: 'Về Tống An',
  intro: 'Chào bạn, mình là Tống An – người đồng hành, coach xây kênh và ứng dụng AI trong marketing.',
  storyHeadline: 'Hành trình từ một người làm nội dung truyền thống đến người tiên phong ứng dụng AI',
  storyBody: [
    'Mình tin rằng mỗi cá nhân, mỗi chủ doanh nghiệp đều sở hữu một câu chuyện độc bản và những giá trị tuyệt vời có thể giúp đỡ người khác. Tuy nhiên, trong thời đại số bùng nổ, việc làm sao để đưa giá trị đó lên môi trường internet một cách bền vững, không bị cuốn vào những thuật toán ngắn hạn hay cạn kiệt năng lượng là một thử thách lớn.',
    'An ở đây để làm người đồng hành cùng bạn. Không chỉ chia sẻ tư duy marketing đúng đắn, An hướng dẫn bạn cách tối ưu hóa quy trình làm việc bằng trí tuệ nhân tạo (AI) – biến công cụ công nghệ phức tạp thành người trợ lý đắc lực giúp bạn viết kịch bản, lên ý tưởng và quản lý nội dung chỉ trong vài phút.',
    'Hãy cùng An định hình lại thương hiệu cá nhân của bạn, xây dựng những viên gạch vững chắc để kênh truyền thông thực sự trở thành một cỗ máy thu hút khách hàng tự động, chân thành và hiệu quả.'
  ],
  placeholderStory: 'Cần bổ sung câu chuyện thật của An: cơ duyên, bước ngoặt, hành trình bắt đầu.'
};

export const PAIN_POINTS = [
  {
    id: 'pain-1',
    title: 'Muốn bán hàng online nhưng không biết bắt đầu từ đâu',
    desc: 'Bị ngập lụt trong biển thông tin, không biết chọn nền tảng nào, định hình phong cách ra sao để thu hút đúng người mua hàng.'
  },
  {
    id: 'pain-2',
    title: 'Đăng bài đều đặn nhưng không thấy có khách hàng',
    desc: 'Làm nội dung chăm chỉ nhưng lượt tương tác thấp, không chuyển đổi thành đơn hàng, cảm thấy công sức bỏ ra vô ích.'
  },
  {
    id: 'pain-3',
    title: 'Mông lung trong việc xây dựng thương hiệu cá nhân',
    desc: 'Chưa biết điểm mạnh của mình là gì, làm sao để trở nên khác biệt và tạo dựng niềm tin sâu sắc trong lòng khách hàng.'
  },
  {
    id: 'pain-4',
    title: 'Sợ quay video, bí ý tưởng nội dung trầm trọng',
    desc: 'Ngại xuất hiện trước ống kính, mỗi lần viết kịch bản là mất cả buổi, nội dung quanh đi quẩn lại chỉ có vài chủ đề cũ.'
  },
  {
    id: 'pain-5',
    title: 'Chưa biết dùng AI để tiết kiệm 80% thời gian',
    desc: 'Nghe nhiều về ChatGPT, Midjourney, Claude... nhưng chỉ dùng ở mức hỏi đáp cơ bản, chưa biến AI thành cỗ máy sản xuất nội dung.'
  },
  {
    id: 'pain-6',
    title: 'Có sản phẩm tốt nhưng kênh chưa là cỗ máy hút khách',
    desc: 'Sản phẩm/dịch vụ vô cùng chất lượng nhưng thiếu một phễu chuyển đổi tự động từ người xem thành người mua hàng trung thành.'
  }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    step: 1,
    title: 'Định vị thương hiệu cá nhân',
    description: 'Tìm ra điểm chạm độc bản của bạn giữa thế mạnh cá nhân và nhu cầu thực tế của thị trường.',
    details: [
      'Khai phá câu chuyện cá nhân thu hút.',
      'Lựa chọn phong cách ngôn ngữ và hình ảnh đồng bộ.',
      'Xác định "USP" (Điểm bán hàng độc nhất) giúp bạn khác biệt giữa đám đông.'
    ]
  },
  {
    step: 2,
    title: 'Xác định khách hàng mục tiêu',
    description: 'Vẽ chân dung khách hàng lý tưởng một cách chi tiết để tạo nội dung chạm đúng mong muốn của họ.',
    details: [
      'Phân tích nỗi đau (Pain points) và khát khao (Pleasure) của người mua.',
      'Xác định hành vi tiêu dùng và thói quen xem mạng xã hội.',
      'Phân khúc tệp khán giả để phân phối nội dung chính xác.'
    ]
  },
  {
    step: 3,
    title: 'Xây dựng trụ cột nội dung',
    description: 'Thiết kế ma trận nội dung đa dạng, có chiều sâu để vừa trao giá trị, vừa tăng uy tín, vừa bán hàng khéo léo.',
    details: [
      'Thiết lập tỷ lệ nội dung vàng (Giá trị - Chuyên môn - Đời sống - Bán hàng).',
      'Lên kế hoạch nội dung (Content Calendar) trong 30 ngày dễ dàng.',
      'Sáng tạo định dạng video ngắn (Shorts/TikTok/Reels) giữ chân người xem.'
    ]
  },
  {
    step: 4,
    title: 'Ứng dụng AI để sản xuất nội dung',
    description: 'Làm chủ các bộ prompt AI để tự động hóa quá trình viết kịch bản, lên ý tưởng, thậm chí thiết kế hình ảnh.',
    details: [
      'Sử dụng bộ Prompt AI độc quyền của Tống An để viết 10 kịch bản video trong 15 phút.',
      'Tạo ý tưởng tiêu đề (Hook) triệu view thu hút click chuột.',
      'Ứng dụng AI chỉnh sửa video, tối ưu âm thanh và phụ đề tự động.'
    ]
  },
  {
    step: 5,
    title: 'Thiết lập quy trình thu lead & bán hàng',
    description: 'Xây dựng hệ thống phễu chuyển đổi tự động từ người theo dõi thành khách hàng tiềm năng.',
    details: [
      'Tạo quà tặng giá trị cao (Lead Magnet) để thu hút thông tin liên hệ.',
      'Thiết lập kịch bản Chatbot tự động tư vấn và chăm sóc khách hàng.',
      'Tối ưu hóa quy trình tư vấn 1-1 và chốt sale chân thành, tỷ lệ cao.'
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Đồng hành 1-1 xây kênh',
    description: 'Chương trình kèm cặp chuyên sâu trực tiếp từ Tống An giúp bạn xây dựng kênh từ con số 0 đến khi có khách hàng.',
    suitableFor: 'Chủ kinh doanh, chuyên gia, giáo viên muốn xây dựng nhân hiệu và bán hàng bài bản.',
    outcome: 'Sở hữu kênh chuẩn hóa thương hiệu, quy trình sản xuất nội dung AI trơn tru và hệ thống thu hút khách tự động.',
    tuition: 'Học phí / thông tin chi tiết: cần bổ sung',
    iconName: 'UserCheck'
  },
  {
    id: 'srv-2',
    title: 'Coach xây kênh',
    description: 'Các buổi khai vấn, định hướng chiến lược nội dung và tháo gỡ khó khăn trong quá trình tự xây kênh của bạn.',
    suitableFor: 'Những ai đã có kênh nhưng bị chững lại, mất định hướng hoặc muốn tối ưu hóa tỷ lệ chuyển đổi.',
    outcome: 'Có ngay bản đồ chiến lược nội dung rõ ràng, sửa lỗi kịch bản và tối ưu kênh đạt hiệu quả chuyển đổi cao hơn.',
    tuition: 'Học phí / thông tin chi tiết: cần bổ sung',
    iconName: 'Compass'
  },
  {
    id: 'srv-3',
    title: 'Khóa học AI',
    description: 'Chương trình đào tạo thực chiến cách ứng dụng các công cụ AI (ChatGPT, Claude, Canva...) vào công việc viết lách và làm video.',
    suitableFor: 'Content creator, người bận rộn muốn tiết kiệm 80% thời gian lên ý tưởng và sản xuất nội dung.',
    outcome: 'Làm chủ bộ prompt AI ứng dụng, tự viết kịch bản, tạo hình ảnh và lập kế hoạch nội dung tự động.',
    tuition: 'Học phí / thông tin chi tiết: cần bổ sung',
    iconName: 'Cpu'
  },
  {
    id: 'srv-4',
    title: 'Khóa học xây kênh',
    description: 'Khóa học từ cơ bản đến nâng cao về tư duy xây kênh, kỹ thuật quay dựng video ngắn bằng điện thoại và cách tối ưu thuật toán.',
    suitableFor: 'Người mới bắt đầu, giáo viên, nhân viên văn phòng muốn tìm kiếm cơ hội thu nhập từ internet.',
    outcome: 'Tự quay, dựng, viết kịch bản video ngắn thu hút, hiểu sâu thuật toán TikTok, Reels, Shorts.',
    tuition: 'Học phí / thông tin chi tiết: cần bổ sung',
    iconName: 'PlayCircle'
  },
  {
    id: 'srv-5',
    title: 'Lộ trình 12 chiến lược xây kênh',
    description: 'Chương trình huấn luyện và đồng hành giúp bạn làm chủ quy trình xây dựng kênh video ngắn chuyên nghiệp từ định vị thương hiệu đến tối ưu chuyển đổi.',
    suitableFor: 'Chủ doanh nghiệp, cá nhân kinh doanh, chuyên gia, hoặc nhà sáng tạo nội dung muốn xây kênh bài bản, chuyển đổi cao.',
    outcome: 'Làm chủ 12 chiến lược thực chiến từ định vị độc bản, tối ưu SEO, kịch bản thu hút, đến kỹ thuật livestream và phễu tự động.',
    tuition: 'Học phí ưu đãi: 499.000đ (Giá gốc 1.990.000đ)',
    iconName: 'Compass'
  },
  {
    id: 'srv-6',
    title: 'Đào tạo Marketing doanh nghiệp',
    description: 'Chương trình tư vấn và thiết kế chiến lược Marketing, đào tạo nội bộ cho đội ngũ nhân sự của doanh nghiệp vừa và nhỏ.',
    suitableFor: 'Doanh nghiệp muốn xây dựng phòng marketing in-house, tối ưu hóa chi phí quảng cáo bằng thương hiệu.',
    outcome: 'Đội ngũ nhân sự làm chủ quy trình xây kênh, sáng tạo nội dung đồng bộ với giá trị cốt lõi của thương hiệu doanh nghiệp.',
    tuition: 'Học phí / thông tin chi tiết: cần bổ sung',
    iconName: 'Briefcase'
  }
];

export const STATS = [
  { value: '3,500+', label: 'Học viên & Khách hàng', note: 'cần bổ sung số liệu thật' },
  { value: '150+', label: 'Kênh đã chuẩn hóa', note: 'cần bổ sung số liệu thật' },
  { value: '1,200+', label: 'Giờ đồng hành & Khai vấn', note: 'cần bổ sung số liệu thật' },
  { value: '98%', label: 'Học viên hài lòng', note: 'cần bổ sung số liệu thật' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Nguyễn Thị Minh Thư',
    role: 'Giáo viên Tiếng Anh - Chủ kênh Học Tiếng Anh Cùng Thư',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    quote: 'Trước khi gặp cô An, mình cực kỳ sợ quay video và mỗi lần viết kịch bản là bế tắc cả ngày. Được An đồng hành rèn dũa 1-1 và hướng dẫn áp dụng AI, mình đã tự tin lên hình. Chỉ sau 2 tháng, kênh của mình đạt 50k followers và có lớp học viên đăng ký liên tục mà không cần chạy quảng cáo! Thật sự biết ơn sự ấm áp và tận tâm của An.',
    channelName: '@tienganhco_thu',
    stats: '50,000+ Followers'
  },
  {
    id: 'test-2',
    name: 'Trần Hải Đăng',
    role: 'Chủ thương hiệu Nước Ép Trái Cây Nguyên Bản',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    quote: 'Sản phẩm bên mình rất ngon nhưng không ai biết tới vì mình không rành marketing. Khóa học Coach xây kênh của Tống An đã giúp mình tháo gỡ mọi nút thắt. An hướng dẫn chi tiết cách làm video ngắn kể về quy trình thu hoạch trái cây mộc mạc. Kênh TikTok của mình đã có clip lên tới 1.2M views, đơn hàng nổ liên tục mỗi ngày!',
    channelName: '@nuocepnguyenban',
    stats: 'Clip 1.2M Views, Doanh số tăng 300%'
  },
  {
    id: 'test-3',
    name: 'Phan Mỹ Linh',
    role: 'Chuyên gia Trị liệu Tâm lý & Giáo dục',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    quote: 'Là một người làm chuyên môn, mình rất ngại việc làm nội dung "bán hàng" xô bồ. Nhưng Tống An đã cho mình một tư duy hoàn toàn khác: Xây kênh là trao đi giá trị một cách chân thành. Những buổi khai vấn của An vô cùng sâu sắc, giúp mình định vị đúng bản thân. Hệ thống phễu thu lead bằng quà tặng sách nói giúp mình có lượng khách hàng hẹn tư vấn đều đặn hàng tuần.',
    channelName: '@mylinh_tamly',
    stats: 'Hẹn tư vấn kín lịch 3 tuần'
  }
];

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    name: 'Facebook cá nhân 1',
    platform: 'facebook',
    url: 'https://www.facebook.com/profile.php?id=61576798630780',
    handle: 'Tống An',
    description: 'Trang cá nhân kết nối sâu sắc, chia sẻ tư duy marketing cốt lõi và góc nhìn cuộc sống.'
  },
  {
    name: 'Facebook cá nhân 2',
    platform: 'facebook',
    url: 'https://www.facebook.com/thuy.an.tong.445604/',
    handle: 'Thủy An Tống',
    description: 'Nơi kết nối trực tiếp với An, chia sẻ về định vị nhân hiệu và lối sống tích cực.'
  },
  {
    name: 'Fanpage Tống An',
    platform: 'facebook',
    url: 'https://www.facebook.com/profile.php?id=61591191849794',
    handle: 'Tống An - Xây Kênh Bền Vững',
    description: 'Kênh cập nhật sự kiện, tài liệu miễn phí và kinh nghiệm thực chiến chuyển đổi phễu.'
  },
  {
    name: 'Fanpage Học Xây Kênh',
    platform: 'facebook',
    url: 'https://www.facebook.com/profile.php?id=61591680844258',
    handle: 'Học Xây Kênh Cùng Tống An',
    description: 'Nơi chia sẻ video ngắn chất lượng, các bài học cầm tay chỉ việc cho người mới bắt đầu.'
  },
  {
    name: 'TikTok Channel',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@hocxaykenhcungtongan?_r=1&_t=ZS-97uIJf87cVJ',
    handle: '@hocxaykenhcungtongan',
    description: 'Các video chia sẻ cách viết kịch bản bằng AI, mẹo giữ chân người xem video ngắn.'
  },
  {
    name: 'YouTube Channel',
    platform: 'youtube',
    url: 'https://www.youtube.com/@MsTongAn',
    handle: 'Tống An',
    description: 'Các bài giảng chuyên sâu, hướng dẫn cài đặt chatbot tự động hóa quy trình chăm sóc khách hàng.'
  },
  {
    name: 'Cộng đồng Zalo',
    platform: 'zalo',
    url: 'https://zalo.me/g/fsuvf5aok5adpz7krl1b',
    handle: 'Nhóm Hỗ Trợ Xây Kênh',
    description: 'Nơi giao lưu học hỏi, thảo luận kịch bản và nhận quà tặng tài liệu từ An hằng ngày.'
  },
  {
    name: 'Website chính thức',
    platform: 'website',
    url: 'https://tonganxaykenh.com',
    handle: 'tonganxaykenh.com',
    description: 'Hệ thống bài viết chuyên sâu, lộ trình đào tạo và đặt lịch hẹn tư vấn coaching 1-1 chỉ với 199K.'
  }
];

export const GIFTS: GiftItem[] = [
  {
    id: 'gift-1',
    title: 'QUY TRÌNH 10 BƯỚC XÂY KÊNH CHUYỂN ĐỔI',
    description: 'Bản đồ chi tiết cầm tay chỉ việc giúp bạn tự rà soát, chuẩn hóa kênh của mình từ hình ảnh, tiểu sử cho đến việc thiết lập phễu bán hàng tự động chuẩn SEO.',
    badge: 'Tài liệu thực chiến',
    iconName: 'ClipboardCheck'
  },
  {
    id: 'gift-2',
    title: '9 NGUYÊN TẮC VÀNG XÂY KÊNH CHUYỂN ĐỔI',
    description: 'Những nguyên lý cốt lõi giúp bạn định vị thương hiệu cá nhân độc bản, giữ chân người xem trung thành và chuyển hóa lưu lượng truy cập thành doanh số thực tế một cách chân thành nhất.',
    badge: 'Bí kíp độc quyền',
    iconName: 'Sparkles'
  }
];

export const CONTACT_INFO = {
  email: 'tongthuyan676@gmail.com',
  phone: '0939869133 - 0374010067',
  zalo: '0939869133 - 0374010067',
  address: '49/2 ẤP AN HỘI A XÃ AN THUẬN HUYỆN THẠNH PHÚ BẾN TRE',
  facebook: 'https://www.facebook.com/profile.php?id=61576798630780',
  tiktok: 'https://www.tiktok.com/@hocxaykenhcungtongan?_r=1&_t=ZS-97uIJf87cVJ',
  youtube: 'https://www.youtube.com/@MsTongAn'
};

// Những câu hỏi thường gặp để đưa vào Chatbot Trợ lý AI của Tống An
export const CHATBOT_FAQ = [
  {
    question: 'Tôi mới bắt đầu, không có nhiều vốn và công nghệ kém thì có xây được kênh không An?',
    answer: 'Chào bạn nhé, đây là băn khoăn của rất nhiều học viên khi tìm đến An. Câu trả lời là HOÀN TOÀN ĐƯỢC nhé!\n\nXây kênh bền vững xuất phát từ chính giá trị chân thật của bạn chứ không phụ thuộc vào thiết bị đắt tiền hay phần mềm phức tạp. Hiện nay, với sự hỗ trợ của AI, việc viết kịch bản hay thiết kế hình ảnh đã trở nên vô cùng đơn giản. An sẽ đồng hành chỉ dẫn bạn từng nút bấm cơ bản nhất trên điện thoại, giúp bạn làm chủ công nghệ chỉ sau vài ngày thực hành.'
  },
  {
    question: 'Làm thế nào để ứng dụng AI viết kịch bản video ngắn nhanh mà không bị "máy móc", vẫn giữ được nét riêng?',
    answer: 'Một câu hỏi cực kỳ tuyệt vời! Bí quyết nằm ở cách chúng ta "huấn luyện" AI.\n\nTrong các chương trình của An, An hướng dẫn học viên không bao giờ copy 100% văn bản của AI. Thay vào đó, chúng ta sẽ áp dụng quy trình 3 bước:\n1. Định hình Phong cách cá nhân (Tone of voice) cho AI.\n2. Cung cấp câu chuyện thực tế hoặc quan điểm riêng của bạn cho AI làm nguyên liệu.\n3. Sử dụng Prompt AI độc quyền của An để xuất bản khung kịch bản, sau đó thổi hồn cảm xúc và từ ngữ đời thường của bạn vào.\n\nNhờ vậy, kịch bản vừa được sản xuất cực nhanh (giảm 80% thời gian) nhưng nghe vẫn vô cùng tự nhiên và đậm chất riêng!'
  },
  {
    question: 'Làm giáo viên/coach thì nên chọn nền tảng nào để xây kênh chia sẻ giá trị tốt nhất?',
    answer: 'Đối với giáo viên, coach hay người chia sẻ tri thức, An khuyên bạn nên tập trung vào hệ sinh thái đa nền tảng nhưng bắt đầu từ 1 kênh cốt lõi:\n\n- **TikTok / Facebook Reels / YouTube Shorts**: Giúp tiếp cận lượng khán giả đại chúng cực kỳ nhanh nhờ thuật toán phân phối video ngắn ưu việt. Đây là nơi bạn trao đi các kiến thức hữu ích, giải đáp thắc mắc ngắn để thu hút sự chú ý.\n- **Facebook cá nhân / Cộng đồng Zalo**: Nơi bạn giữ chân khán giả, viết bài chia sẻ sâu sắc hơn để xây dựng lòng tin lớn.\n- **Hệ thống Quà tặng (Lead Magnet)**: Cực kỳ quan trọng để chuyển đổi người xem thành học viên thực sự.\n\nAn sẽ giúp bạn định hình phễu chuyển đổi phù hợp nhất với chuyên môn của bạn nhé!'
  },
  {
    question: 'Tôi rất sợ ống kính, nói năng hay bị lắp bắp thì làm video như thế nào?',
    answer: 'Đừng lo lắng nhé bạn ơi, sợ ống kính là phản xạ tâm lý rất bình thường của hơn 90% người mới bắt đầu. An có một vài mẹo thực chiến giúp bạn vượt qua nỗi sợ này lập tức:\n\n1. **Kỹ thuật tập trung vào một người**: Hãy tưởng tượng ống kính máy ảnh là một người bạn thân thiết nhất đang ngồi lắng nghe bạn chia sẻ, nói chuyện một cách tự nhiên nhất.\n2. **Sử dụng máy nhắc chữ (Teleprompter)**: Tránh việc phải ghi nhớ quá nhiều chữ dẫn tới lắp bắp, An sẽ hướng dẫn bạn dùng ứng dụng nhắc chữ chạy ngay trên màn hình điện thoại rất chuyên nghiệp.\n3. **Bắt đầu bằng video lồng tiếng (Voiceover)**: Bạn có thể quay đôi tay đang rèn chữ, hình ảnh làm việc, slide bài giảng... rồi sau đó ghi âm giọng nói ấm áp của mình đè lên. Khi đã quen, bạn chuyển sang xuất hiện khuôn mặt dần dần nhé!'
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'course-1',
    title: 'Làm Chủ Notion Nhàn Nhã Xây Kênh',
    description: 'Sắp xếp ý tưởng, quản lý lịch biên tập nội dung đa kênh và lưu trữ kịch bản khoa học giúp quy trình sản xuất video trở nên thảnh thơi, dễ dàng và có tổ chức.',
    duration: '3 giờ học',
    lessonsCount: 10,
    price: '690.000đ',
    youtubeId: 'Qd8FLft1zSw',
    youtubeUrl: 'https://www.youtube.com/watch?v=Qd8FLft1zSw',
    zaloUrl: 'https://zalo.me/g/8fvylqgt1x0h0uifw7y7',
    highlights: [
      'Thiết lập hệ thống lưu trữ ý tưởng thông minh',
      'Mẫu Notion quản lý lịch đăng bài (Content Calendar) tự động',
      'Mẫu quản lý kịch bản kéo thả trực quan',
      'Tối ưu hóa quy trình sản xuất video cá nhân'
    ]
  },
  {
    id: 'course-4',
    title: 'Khóa học tự làm Website trong 5 buổi học',
    description: 'Tự tay thiết kế trang Landing Page, Website bán hàng hoặc Portfolio cá nhân đẹp mắt chuyên nghiệp mà không cần biết viết code, tối ưu giao diện giúp gia tăng tỷ lệ chuyển đổi chỉ sau 5 buổi học.',
    duration: '5 buổi học',
    lessonsCount: 5,
    price: '890.000đ',
    youtubeId: 'tKmTqf9Rd1Q',
    youtubeUrl: 'https://www.youtube.com/watch?v=tKmTqf9Rd1Q',
    zaloUrl: 'https://zalo.me/g/35isyjmar64vdqys4lo6',
    highlights: [
      'Thiết lập bố cục Landing Page chuẩn trải nghiệm người dùng',
      'Làm chủ các công cụ kéo thả thiết kế Website tối giản',
      'Bí quyết viết nội dung và thiết kế nút kêu gọi hành động CTA',
      'Tích hợp cổng thanh toán và Form thu thập dữ liệu tự động'
    ]
  },
  {
    id: 'course-5',
    title: 'Huấn Luyện ChatGPT & Thiết Kế Trợ Lý Ảo',
    description: 'Học cách viết Prompt chuyên sâu để huấn luyện ChatGPT trở thành người trợ lý đắc lực hiểu rõ sản phẩm, giọng điệu của bạn, đồng hành biên tập kịch bản.',
    duration: '4 giờ học',
    lessonsCount: 12,
    price: '590.000đ',
    youtubeId: '9FtLCkaW_so',
    youtubeUrl: 'https://www.youtube.com/watch?v=9FtLCkaW_so',
    zaloUrl: 'https://zalo.me/g/quejhdnamioxccqtypa5',
    highlights: [
      'Công thức viết Prompt chuyên nghiệp (Role - Context - Task)',
      'Huấn luyện ChatGPT học giọng điệu cá nhân độc bản',
      'Thiết kế trợ lý ảo AI chuyên trách viết kịch bản',
      'Ứng dụng AI nghiên cứu thị trường & đối thủ siêu tốc'
    ]
  },
  {
    id: 'course-6',
    title: 'Tạo Video AI Chuyên Nghiệp Thần Tốc',
    description: 'Tận dụng sức mạnh của các công cụ AI thế hệ mới để sản xuất video tự động từ văn bản: tạo giọng đọc trí tuệ nhân tạo, nhân vật ảo, hình ảnh minh họa sống động.',
    duration: '4 giờ học',
    lessonsCount: 10,
    price: '790.000đ',
    youtubeId: '7RVv9jWVyM4',
    youtubeUrl: 'https://www.youtube.com/watch?v=7RVv9jWVyM4',
    zaloUrl: 'https://zalo.me/g/qdepb9decolipgq1ku0i',
    highlights: [
      'Chuyển văn bản thành giọng đọc truyền cảm bằng AI',
      'Tạo nhân vật ảo (Digital Avatar) thuyết trình tự nhiên',
      'Ghép nối hình ảnh & video minh họa tự động bằng AI',
      'Quy trình sản xuất hàng loạt video ngắn lên xu hướng'
    ]
  },
  {
    id: 'course-8',
    title: 'Marketing Online Toàn Diện Cho Người Mới',
    description: 'Nắm vững bức tranh tổng quan về tiếp thị số đa kênh: SEO, quảng cáo Facebook/TikTok, tiếp thị nội dung chạm đúng nỗi đau khách hàng và cách vận hành phễu.',
    duration: '6 giờ học',
    lessonsCount: 18,
    price: '990.000đ',
    youtubeId: 'StmKrhmwFw8',
    youtubeUrl: 'https://www.youtube.com/watch?v=StmKrhmwFw8',
    highlights: [
      'Tư duy thiết lập phễu Marketing đa kênh hút khách hàng',
      'Chiến lược sáng tạo nội dung đánh trúng tâm lý người mua',
      'Cách thiết lập chiến dịch quảng cáo tối giản, tối ưu chi phí',
      'Đo lường các chỉ số cốt lõi để thúc đẩy doanh số'
    ]
  },
  {
    id: 'course-12',
    title: 'Lộ Trình Huấn Luyện Thực Chiến 12 Chương',
    description: 'Chương trình đào tạo cao cấp đồng hành cầm tay chỉ việc giúp bạn chuẩn hóa định vị, làm chủ các công cụ AI và xây dựng hệ thống video ngắn đa nền tảng từ con số 0.',
    duration: '12 buổi thực chiến',
    lessonsCount: 12,
    price: '1.990.000đ',
    youtubeId: 'Do8XFNxm5nY',
    youtubeUrl: 'https://www.youtube.com/watch?v=Do8XFNxm5nY',
    highlights: [
      'Định vị thương hiệu độc bản & 9 nguyên tắc vàng xây kênh',
      'Quy trình chuẩn hóa SEO kênh & ứng dụng AI thiết kế hình ảnh',
      'Kỹ thuật nói trước máy nhắc chữ & dựng video Capcut AI siêu tốc',
      'Chiến lược Affiliate sản phẩm số & kịch bản livestream chuyển đổi'
    ]
  }
];
