import React, { useState } from 'react';

const RITUAL_STEPS = [
  {
    step: "01",
    name: "Cleanse & Clarify",
    title: "Prep Your Canvas",
    desc: "Wash away impurities, excess sebum, and environmental micro-pollutants without stripping the delicate acid mantle.",
    recommended: "Botanical Balance Clarifying Mist",
    badge: "Morning & Night",
    tip: "Use lukewarm water to keep natural skin lipids intact."
  },
  {
    step: "02",
    name: "Balance & Tone",
    title: "Restore Optimal pH 5.5",
    desc: "Infuse cells with antioxidant green tea water and witch hazel to tighten pores and maximize subsequent absorption.",
    recommended: "Botanical Balance Clarifying Mist (150ml)",
    badge: "Immediate Hydration",
    tip: "Spritz generously and pat gently with clean palms."
  },
  {
    step: "03",
    name: "Potent Serum Actives",
    title: "Target & Transform",
    desc: "Deliver 10% stabilized Vitamin C and triple Hyaluronic Acid deep into the dermis to fade spots and plump cell volume.",
    recommended: "Lumina Glow Hydra-Serum (30ml)",
    badge: "Clinical Potency",
    tip: "Apply 3-4 drops while skin is still slightly damp."
  },
  {
    step: "04",
    name: "Seal & Shield",
    title: "Lock Moisture & Defense",
    desc: "Lock in deep cellular hydration with 5-peptide whipped ceramides, followed by invisible silk broad-spectrum SPF 50+.",
    recommended: "Aethel Whipped Peptide Cream + SPF 50+",
    badge: "72-Hour Barrier",
    tip: "Never skip daily SPF, even when indoors under LED screens."
  }
];

export default function SkincareRitualGuide({ onOpenQuickView }) {
  const [activeStep, setActiveStep] = useState(2); // default step 3 (serum)

  const current = RITUAL_STEPS[activeStep];

  return (
    <section className="ritual-section" aria-label="Skincare Ritual Guide">
      <div className="section-header">
        <span className="section-pill">Expert Routine</span>
        <h2 className="section-title">The 4-Step Radiance Ritual</h2>
        <p className="section-desc">
          How to layer your formulations in order to achieve the ultimate glass-skin glow.
        </p>
      </div>

      <div className="ritual-card">
        {/* Step Buttons */}
        <div className="ritual-steps-nav">
          {RITUAL_STEPS.map((s, index) => (
            <div
              key={s.step}
              className={`ritual-step-btn ${activeStep === index ? 'active' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              <span className="step-num">Step {s.step}</span>
              <h3 className="step-name">{s.name}</h3>
            </div>
          ))}
        </div>

        {/* Step Details */}
        <div className="ritual-step-content">
          <div>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              color: 'var(--gold-dark)', 
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              {current.badge}
            </span>
            <h3 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.75rem', 
              color: 'var(--text-main)', 
              margin: '8px 0 12px' 
            }}>
              {current.title}
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              {current.desc}
            </p>
            <div style={{ 
              background: '#FFF', 
              padding: '12px 18px', 
              borderRadius: '12px', 
              border: '1px solid rgba(192, 149, 106, 0.25)',
              marginBottom: '16px'
            }}>
              <strong style={{ fontSize: '0.8125rem', color: 'var(--text-main)', display: 'block' }}>
                💡 Beauty Expert Tip:
              </strong>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                {current.tip}
              </span>
            </div>
          </div>

          <div style={{ 
            background: '#FFF', 
            borderRadius: '16px', 
            padding: '24px', 
            border: '1px solid rgba(192, 149, 106, 0.2)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Recommended Hero:
            </span>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', margin: '8px 0 16px' }}>
              {current.recommended}
            </h4>
            <button 
              className="btn-card-add"
              onClick={() => onOpenQuickView(activeStep === 2 ? 'prod-1' : 'prod-2')}
            >
              Discover Formulation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
