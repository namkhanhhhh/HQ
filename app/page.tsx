'use client'

import { Clock, Download } from 'lucide-react'
import { useRef } from 'react'
import dynamic from 'next/dynamic'

interface Service {
  vietnameseName: string
  englishName: string
  price: string
  highlight?: boolean
}

const services: Service[] = [
  // Dịch vụ tóc
  { vietnameseName: 'Cắt tóc nữ', englishName: 'Lady\'s Haircut', price: '400.000 VNĐ' },
  { vietnameseName: 'Cắt tóc nam', englishName: 'Men\'s Haircut', price: '400.000 VNĐ' },
  { vietnameseName: 'Cạo râu', englishName: 'Shaving', price: '200.000 VNĐ' },
  { vietnameseName: 'Cắt tóc mái', englishName: 'Bangs / Fringe Trim', price: '100.000 VNĐ' },
  { vietnameseName: 'Nhuộm, tạo màu', englishName: 'Hair Coloring & Toning', price: '800.000 - 3.000.000 VNĐ', highlight: true },
  { vietnameseName: 'Chải duỗi vĩnh viễn', englishName: 'Permanent Hair Straightening', price: '800.000 - 3.000.000 VNĐ', highlight: true },
  { vietnameseName: 'Hấp dưỡng', englishName: 'Hair Steam Treatment', price: '500.000 - 1.800.000 VNĐ', highlight: true },
  { vietnameseName: 'Phục hồi tóc / Mặt nạ chuyên sâu', englishName: 'Deep Hair Repair Mask', price: '800.000 - 2.000.000 VNĐ', highlight: true },
  { vietnameseName: 'Tẩy tóc', englishName: 'Hair Bleaching', price: '1.000.000 - 3.000.000 VNĐ', highlight: true },
  { vietnameseName: 'Uốn xoăn vĩnh viễn', englishName: 'Permanent Wave (Perm)', price: '800.000 - 3.000.000 VNĐ', highlight: true },
  { vietnameseName: 'Ép tóc', englishName: 'Hair Rebonding / Flat Ironing', price: '800.000 - 3.000.000 VNĐ', highlight: true },
  { vietnameseName: 'Gội đầu', englishName: 'Hair Wash', price: '150.000 VNĐ' },
  { vietnameseName: 'Sấy tạo kiểu', englishName: 'Blow-dry & Styling', price: '200.000 VNĐ' },
  // Massage & chăm sóc da
  { vietnameseName: 'Massage vai gáy (30ph)', englishName: 'Neck & Shoulder Massage', price: '300.000 VNĐ', highlight: true },
  { vietnameseName: 'Massage chân (60ph)', englishName: 'Foot Massage', price: '500.000 VNĐ', highlight: true },
  { vietnameseName: 'Xông hơi mặt', englishName: 'Facial Steam Treatment', price: '200.000 VNĐ' },
  { vietnameseName: 'Đắp mặt nạ', englishName: 'Face Mask Treatment', price: '200.000 VNĐ' },
  { vietnameseName: 'Tẩy da chết mặt', englishName: 'Facial Exfoliation', price: '100.000 VNĐ' },
  { vietnameseName: 'Tẩy da chết, chà gót chân', englishName: 'Foot Scrub & Heel Exfoliation', price: '200.000 VNĐ' },
  // Waxing
  { vietnameseName: 'Wax lông mày', englishName: 'Eyebrow Waxing', price: '300.000 VNĐ' },
  { vietnameseName: 'Wax ria mép', englishName: 'Upper Lip Waxing', price: '200.000 VNĐ' },
  { vietnameseName: 'Waxing 2 tay', englishName: 'Full Arm Waxing', price: '500.000 VNĐ' },
  { vietnameseName: 'Waxing 2 chân', englishName: 'Full Leg Waxing', price: '800.000 - 1.000.000 VNĐ', highlight: true },
  // Nail
  { vietnameseName: 'Sơn, vẽ móng', englishName: 'Nail Art & Polish', price: '500.000 - 1.000.000 VNĐ', highlight: true },
  { vietnameseName: 'Sơn sửa móng tay (Gel)', englishName: 'Gel Manicure', price: '200.000 VNĐ' },
  { vietnameseName: 'Sơn sửa móng chân (Gel)', englishName: 'Gel Pedicure', price: '200.000 VNĐ' },
  { vietnameseName: 'Làm móng giả', englishName: 'Nail Extensions', price: '500.000 VNĐ' },
  { vietnameseName: 'Móng đính đá', englishName: 'Nail Rhinestones/Diamonds', price: 'Theo mẫu (On Request)' },
  // Trang điếm
  { vietnameseName: 'Trang điểm', englishName: 'Professional Makeup', price: '500.000 VNĐ' },
]

export default function Page() {
  const posterRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)

  const exportPDF = async () => {
    if (!exportRef.current) return

    try {
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')

      const element = exportRef.current
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save('Hair_Salon_Quynh_Huong_PriceList.pdf')
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Lỗi khi xuất PDF. Vui lòng thử lại!')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      {/* PDF Export Button */}
      <button
        onClick={exportPDF}
        className="mb-4 flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors shadow-lg"
      >
        <Download size={18} />
        Xuất PDF
      </button>

      {/* Hidden Export Container - Full content for PDF */}
      <div ref={exportRef} className="absolute -left-full -top-full bg-white" style={{ width: '210mm', padding: '20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', minHeight: 'fit-content' }}>
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-2 pb-2 flex items-start gap-4">
            {/* Logo at Left */}
            <div className="flex-shrink-0 pt-1">
              <div className="text-3xl font-light text-primary" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>QH</div>
            </div>
            
            {/* Centered Title and Contact */}
            <div className="flex-1 text-center">
              <div className="text-sm font-semibold tracking-widest text-muted-foreground mb-0.5">HAIR SALON</div>
              <h1 className="text-2xl font-light italic text-primary mb-1">Quỳnh Hương</h1>
              <div className="border-t-2 border-primary pt-1">
                <div className="text-xs text-foreground leading-tight">
                  <p className="font-semibold mb-0">51A Nguyễn Siêu, Hoàn Kiếm, Hà Nội</p>
                  <p className="font-bold text-primary text-xs">☎ 0985 257 577</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours - Moved to top */}
          <div className="text-center mb-2 pb-2 border-b-2 border-primary">
            <div className="flex items-center justify-center gap-1 text-xs">
              <Clock size={12} className="text-primary" />
              <span className="font-medium text-xs">8:00 AM - 8:00 PM</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-3 gap-2 border-b-2 border-primary pb-1 text-xs font-bold text-primary">
            <div>Dịch Vụ</div>
            <div>Service</div>
            <div className="text-right">Giá / Price</div>
          </div>

          {/* Services List */}
          <div className="text-xs">
            {services.map((service, index) => (
              <div key={index} className={`grid grid-cols-3 gap-2 border-b border-secondary py-3 px-1 ${
                service.highlight ? 'bg-red-50' : ''
              }`}>
                <div className={`font-medium leading-normal text-xs ${service.highlight ? 'text-primary font-bold' : 'text-foreground'}`}>
                  {service.vietnameseName}
                </div>
                <div className={`italic leading-normal text-xs ${service.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                  {service.englishName}
                </div>
                <div className={`text-right font-semibold leading-normal text-xs ${
                  service.highlight ? 'text-primary' : 'text-foreground'
                }`}>
                  {service.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* A4 Container - 210mm x 297mm (Display only) */}
      <div ref={posterRef} className="relative w-full max-w-2xl bg-white shadow-2xl" style={{ aspectRatio: '210/297' }}>
        <div className="flex h-full flex-col p-6">
          {/* Header */}
          <div className="mb-2 pb-2 flex items-start gap-4">
            {/* Logo at Left */}
            <div className="flex-shrink-0 pt-1">
              <div className="text-3xl font-light text-primary" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>QH</div>
            </div>
            
            {/* Centered Title and Contact */}
            <div className="flex-1 text-center">
              <div className="text-sm font-semibold tracking-widest text-muted-foreground mb-0.5">HAIR SALON</div>
              <h1 className="text-2xl font-light italic text-primary mb-1">Quỳnh Hương</h1>
              <div className="border-t-2 border-primary pt-1">
                <div className="text-xs text-foreground leading-tight">
                  <p className="font-semibold mb-0">51A Nguyễn Siêu, Hoàn Kiếm, Hà Nội</p>
                  <p className="font-bold text-primary text-xs">☎ 0985 257 577</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours - Moved to top */}
          <div className="text-center mb-2 pb-2 border-b-2 border-primary">
            <div className="flex items-center justify-center gap-1 text-xs">
              <Clock size={12} className="text-primary" />
              <span className="font-medium text-xs">8:00 AM - 8:00 PM</span>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-3 gap-2 border-b-2 border-primary pb-1 text-xs font-bold text-primary">
            <div>Dịch Vụ</div>
            <div>Service</div>
            <div className="text-right">Giá / Price</div>
          </div>

          {/* Services List */}
          <div className="flex-1 overflow-y-auto text-xs">
            {services.map((service, index) => (
              <div key={index} className={`grid grid-cols-3 gap-2 border-b border-secondary py-3 px-1 ${
                service.highlight ? 'bg-red-50' : ''
              }`}>
                <div className={`font-medium leading-normal ${service.highlight ? 'text-primary font-bold' : 'text-foreground'}`}>
                  {service.vietnameseName}
                </div>
                <div className={`italic leading-normal ${service.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                  {service.englishName}
                </div>
                <div className={`text-right font-semibold leading-normal ${
                  service.highlight ? 'text-primary' : 'text-foreground'
                }`}>
                  {service.price}
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  )
}
