import React, { useState } from 'react'
import TemplateGallery from './components/TemplateGallery'
import ResumeBuilder from './components/ResumeBuilder'
import PaymentModal from './components/PaymentModal'

export default function App() {
  const [screen, setScreen] = useState('gallery') // 'gallery' | 'builder'
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [payModalOpen, setPayModalOpen] = useState(false)
  const [orderData, setOrderData] = useState(null)  // { resumeData, templateId }

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId)
    setScreen('builder')
  }

  // Called by the Download button inside ResumeBuilder
  const handlePay = (resumeData, templateId) => {
    setOrderData({ resumeData, templateId })
    setPayModalOpen(true)
  }

  return (
    <>
      {/* Page content */}
      {screen === 'gallery' && (
        <TemplateGallery onSelect={handleSelectTemplate} />
      )}

      {screen === 'builder' && (
        <ResumeBuilder
          templateId={selectedTemplate}
          onBack={() => setScreen('gallery')}
          onPay={handlePay}
        />
      )}

      {/* Payment modal — sits on top of builder */}
      {payModalOpen && orderData && (
        <PaymentModal
          resumeData={orderData.resumeData}
          templateId={orderData.templateId}
          onClose={() => setPayModalOpen(false)}
          onDone={() => {
            setPayModalOpen(false)
            // Optionally send user back to gallery after successful order
            // setScreen('gallery')
          }}
        />
      )}
    </>
  )
}
