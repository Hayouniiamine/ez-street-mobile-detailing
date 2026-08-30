import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  Close,
  Phone,
  Clock,
  MapPin,
  Message,
} from './Icons'
import { useSite } from '../context/SiteData'
import { useBooking } from '../context/BookingContext'
import Logo from './Logo'

const VEHICLE_TYPES = [
  {
    id: 'sedan',
    name: 'Sedan / Coupe',
    desc: 'Cars, hatchbacks & 2-door coupes',
    icon: '🚗',
    surcharge: 0,
  },
  {
    id: 'suv',
    name: 'Mid-Size SUV / Crossover',
    desc: 'RAV4, CR-V, Model Y, Macan, etc.',
    icon: '🚙',
    surcharge: 30,
  },
  {
    id: 'truck',
    name: 'Full Truck / 3-Row SUV / Van',
    desc: 'F-150, Tahoe, Suburban, Odyssey, etc.',
    icon: '🛻',
    surcharge: 50,
  },
  {
    id: 'boat',
    name: 'Boat / Marine Vessel',
    desc: 'Center consoles, bowriders & cruisers',
    icon: '🚤',
    surcharge: 100,
  },
  {
    id: 'rv',
    name: 'RV / Motorhome / Camper',
    desc: 'Class A/B/C, travel trailers & 5th wheels',
    icon: '🚐',
    surcharge: 150,
  },
]

const POPULAR_PACKAGES = [
  {
    id: 'classic',
    title: 'Classic Package',
    basePrice: 249,
    tag: 'Full Reset',
    popular: false,
    summary: 'Interior blowout, vacuum, leather/dash UV protect + Exterior wash, wax, rims & tires',
  },
  {
    id: 'deluxe',
    title: 'Deluxe Package',
    basePrice: 599,
    tag: 'Most Popular',
    popular: true,
    summary: 'Classic + Clay/fallout decon, engine bay, undercarriage, gloss enhance & 6-month ceramic sealant',
  },
  {
    id: 'ceramic_2yr',
    title: '2-Year Ceramic Coating',
    basePrice: 749,
    tag: 'Long-Term Armor',
    popular: false,
    summary: 'Full paint decon, clay, iron removal, gloss polish & hand-applied 2-year ceramic coating',
  },
  {
    id: 'ceramic_5yr',
    title: '5-Year Ceramic Coating',
    basePrice: 949,
    tag: 'Maximum Value',
    popular: false,
    summary: 'Multi-stage decon, paint correction polish & flagship 5-year ultra-hydrophobic ceramic armor',
  },
  {
    id: 'interior_deep',
    title: 'Interior Deep Clean & Steam',
    basePrice: 199,
    tag: 'Cabin Reset',
    popular: false,
    summary: 'Deep steam extraction, stain removal, leather conditioner & pet hair/odor disinfection',
  },
]

const ADD_ONS = [
  {
    id: 'add_headlight',
    title: 'Headlight Oxidation Restoration',
    price: 60,
    icon: '💡',
    desc: 'Wet sand, compound & UV clear sealant to restore foggy lenses',
  },
  {
    id: 'add_engine',
    title: 'Engine Bay Clean & UV Protect',
    price: 75,
    icon: '⚙️',
    desc: 'Degrease, steam clean & dress all plastics with matte UV guard',
  },
  {
    id: 'add_undercarriage',
    title: 'Undercarriage Blast Cleaning',
    price: 50,
    icon: '🛡️',
    desc: 'High-pressure salt, mud & road grime flush from beneath chassis',
  },
  {
    id: 'add_scratch',
    title: 'Spot Scratch & Scuff Polish',
    price: 90,
    icon: '✨',
    desc: 'Machine polish light clear-coat scratches, swirls & paint transfer',
  },
  {
    id: 'add_pethair',
    title: 'Heavy Pet Hair & Odor Neutralization',
    price: 45,
    icon: '🐾',
    desc: 'Specialized rubber extraction tools & enzymatic odor treatment',
  },
  {
    id: 'add_glass_ceramic',
    title: 'Windshield & Glass Ceramic Repel',
    price: 40,
    icon: '💧',
    desc: 'Hydrophobic rain-repelling ceramic treatment on all exterior glass',
  },
]

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning Slot', time: '8:00 AM – 12:00 PM', icon: '🌅' },
  { id: 'afternoon', label: 'Afternoon Slot', time: '12:00 PM – 4:00 PM', icon: '☀️' },
  { id: 'evening', label: 'Late Afternoon', time: '4:00 PM – 6:00 PM', icon: '🌆' },
]

const LOCATION_TYPES = [
  { id: 'home', label: 'Home Driveway', icon: '🏡' },
  { id: 'office', label: 'Office / Workplace', icon: '🏢' },
  { id: 'marina', label: 'Marina / Boat Dock', icon: '🚤' },
  { id: 'campsite', label: 'RV Campsite / Storage', icon: '🏕️' },
]

const QUICK_TOWNS = ['Newburgh', 'Poughkeepsie', 'Beacon', 'Middletown', 'Goshen', 'Kingston', 'Warwick', 'Fishkill']

export default function BookingModal() {
  const { isOpen, closeBooking, initialData } = useBooking()
  const { business, addMessage } = useSite()

  const [step, setStep] = useState(1) // 1: Vehicle, 2: Package & Add-ons, 3: Schedule, 4: Contact & Review, 5: Confirmed

  // Form State
  const [vehicleType, setVehicleType] = useState('suv')
  const [vehicleDetails, setVehicleDetails] = useState({ year: '', make: '', model: '', color: '' })
  const [selectedPackage, setSelectedPackage] = useState('deluxe')
  const [selectedAddons, setSelectedAddons] = useState([])
  const [locationType, setLocationType] = useState('home')
  const [address, setAddress] = useState('')
  const [serviceDate, setServiceDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  })
  const [timeSlot, setTimeSlot] = useState('morning')
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '', email: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [bookingRef, setBookingRef] = useState('')

  // Pre-fill initial package if passed from context trigger (e.g. "Classic", "Deluxe", "Ceramic")
  useEffect(() => {
    if (initialData?.packageTitle) {
      const match = POPULAR_PACKAGES.find((p) =>
        p.title.toLowerCase().includes(initialData.packageTitle.toLowerCase())
      )
      if (match) {
        setSelectedPackage(match.id)
      } else if (initialData.packageTitle.toLowerCase().includes('interior')) {
        setSelectedPackage('interior_deep')
      }
    }
  }, [initialData])

  // Reset when opening
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setErrors({})
    }
  }, [isOpen])

  // Calculate live estimate
  const currentVehicle = VEHICLE_TYPES.find((v) => v.id === vehicleType) || VEHICLE_TYPES[0]
  const currentPackage = POPULAR_PACKAGES.find((p) => p.id === selectedPackage) || POPULAR_PACKAGES[1]

  const estimatedTotal = useMemo(() => {
    let total = currentPackage.basePrice + currentVehicle.surcharge
    selectedAddons.forEach((id) => {
      const addon = ADD_ONS.find((a) => a.id === id)
      if (addon) total += addon.price
    })
    return total
  }, [currentPackage, currentVehicle, selectedAddons])

  if (!isOpen) return null

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const validateStep = (currentStep) => {
    const err = {}
    if (currentStep === 1) {
      if (!vehicleType) err.vehicleType = 'Please select a vehicle type.'
    } else if (currentStep === 2) {
      if (!selectedPackage) err.package = 'Please select a detailing package.'
    } else if (currentStep === 3) {
      if (!address.trim()) err.address = 'Please enter your street address or city/ZIP.'
      if (!serviceDate) err.date = 'Please pick a preferred date.'
    } else if (currentStep === 4) {
      if (!clientInfo.name.trim()) err.name = 'Please enter your full name.'
      if (!clientInfo.phone.trim()) err.phone = 'Please enter your mobile phone number.'
      else if (clientInfo.phone.replace(/\D/g, '').length < 10)
        err.phone = 'Please enter a valid 10-digit phone number.'
    }
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1))
  }

  const handleFinalSubmit = (e) => {
    e.preventDefault()
    if (!validateStep(4)) return

    const refNumber = `EZ-${Math.floor(10000 + Math.random() * 90000)}`
    setBookingRef(refNumber)

    const addonNames = selectedAddons
      .map((id) => ADD_ONS.find((a) => a.id === id)?.title)
      .filter(Boolean)

    const bookingPayload = {
      name: clientInfo.name,
      phone: clientInfo.phone,
      email: clientInfo.email,
      vehicle: `${vehicleDetails.year} ${vehicleDetails.make} ${vehicleDetails.model} (${currentVehicle.name})`.trim() || currentVehicle.name,
      package: `${currentPackage.title} (Est. $${estimatedTotal})`,
      date: `${serviceDate} · ${TIME_SLOTS.find((s) => s.id === timeSlot)?.label || timeSlot}`,
      location: `${address} (${LOCATION_TYPES.find((l) => l.id === locationType)?.label || locationType})`,
      notes: `Add-ons: ${addonNames.join(', ') || 'None'}. Notes: ${clientInfo.notes || 'None'}. Booking Ref: ${refNumber}`,
      estimatedTotal,
      refNumber,
    }

    addMessage(bookingPayload)
    setStep(5) // Confirmation step
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-2 sm:p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-xl bg-white shadow-2xl overflow-hidden my-auto max-h-[96vh] flex flex-col border border-rule">
        {/* Header Bar */}
        <div className="bg-ink px-6 py-4 text-white flex items-center justify-between border-b border-ink-line shrink-0">
          <div className="flex items-center gap-3">
            <Logo tone="light" />
            <span className="hidden sm:inline-block h-4 w-px bg-white/20" />
            <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              Mobile Booking Wizard
            </span>
          </div>

          <div className="flex items-center gap-4">
            {step < 5 && (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                  Est. Total:
                </span>
                <span className="font-display text-lg tracking-wide text-brand leading-none">
                  ${estimatedTotal}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={closeBooking}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label="Close booking modal"
            >
              <Close width={22} height={22} />
            </button>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        {step < 5 && (
          <div className="bg-mist px-6 py-3 border-b border-rule shrink-0">
            <div className="flex items-center justify-between max-w-2xl mx-auto text-[11px] font-bold uppercase tracking-wider">
              {[
                { n: 1, label: 'Vehicle' },
                { n: 2, label: 'Service' },
                { n: 3, label: 'Schedule' },
                { n: 4, label: 'Contact' },
              ].map((s) => (
                <div
                  key={s.n}
                  className={`flex items-center gap-2 ${
                    step === s.n
                      ? 'text-brand'
                      : step > s.n
                      ? 'text-ink'
                      : 'text-muted/50'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                      step === s.n
                        ? 'bg-brand text-white shadow-sm'
                        : step > s.n
                        ? 'bg-ink text-white'
                        : 'bg-rule text-muted'
                    }`}
                  >
                    {step > s.n ? '✓' : s.n}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white">
          {/* STEP 1: VEHICLE TYPE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="eyebrow-plain text-brand">Step 1 of 4</span>
                <h2 className="font-display text-3xl uppercase tracking-wide text-ink mt-1">
                  Select Your <span className="text-brand">Vehicle Type</span>
                </h2>
                <p className="text-[14px] text-muted mt-1">
                  Choose the vehicle size to help us calculate accurate cleaning time and product volume.
                </p>
              </div>

              {errors.vehicleType && (
                <div className="rounded bg-red-50 p-3 text-[13px] text-brand border border-red-200">
                  {errors.vehicleType}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {VEHICLE_TYPES.map((v) => {
                  const isSelected = vehicleType === v.id
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVehicleType(v.id)}
                      className={`text-left p-4 rounded-lg border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-brand bg-red-50/30 shadow-md ring-1 ring-brand'
                          : 'border-rule bg-white hover:border-ink/50 hover:bg-mist/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-3xl">{v.icon}</span>
                        {isSelected && (
                          <span className="h-5 w-5 rounded-full bg-brand text-white flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="mt-4">
                        <span className="font-alt text-[15px] font-bold uppercase tracking-wide text-ink block">
                          {v.name}
                        </span>
                        <span className="text-[12px] text-muted block mt-0.5 leading-snug">
                          {v.desc}
                        </span>
                      </div>
                      <div className="mt-3 pt-2 border-t border-rule/60 flex items-center justify-between text-[11px] font-semibold text-muted">
                        <span>Size tier:</span>
                        <span className={v.surcharge > 0 ? 'text-brand' : 'text-emerald-700'}>
                          {v.surcharge === 0 ? 'Standard Rate' : `+$${v.surcharge}`}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Optional Vehicle Specs */}
              <div className="border-t border-rule pt-5">
                <span className="text-[12px] font-bold uppercase tracking-wider text-muted block mb-3">
                  Vehicle Specs (Optional)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <input
                    className="field !text-[13px] !py-2.5"
                    placeholder="Year (e.g. 2021)"
                    value={vehicleDetails.year}
                    onChange={(e) =>
                      setVehicleDetails({ ...vehicleDetails, year: e.target.value })
                    }
                  />
                  <input
                    className="field !text-[13px] !py-2.5"
                    placeholder="Make (e.g. Ford)"
                    value={vehicleDetails.make}
                    onChange={(e) =>
                      setVehicleDetails({ ...vehicleDetails, make: e.target.value })
                    }
                  />
                  <input
                    className="field !text-[13px] !py-2.5"
                    placeholder="Model (e.g. F-150)"
                    value={vehicleDetails.model}
                    onChange={(e) =>
                      setVehicleDetails({ ...vehicleDetails, model: e.target.value })
                    }
                  />
                  <input
                    className="field !text-[13px] !py-2.5"
                    placeholder="Color (e.g. Black)"
                    value={vehicleDetails.color}
                    onChange={(e) =>
                      setVehicleDetails({ ...vehicleDetails, color: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PACKAGE & ADD-ONS */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="eyebrow-plain text-brand">Step 2 of 4</span>
                <h2 className="font-display text-3xl uppercase tracking-wide text-ink mt-1">
                  Select <span className="text-brand">Package &amp; Add-Ons</span>
                </h2>
                <p className="text-[14px] text-muted mt-1">
                  Pick your detailing tier and add optional specialty services.
                </p>
              </div>

              {/* Package Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {POPULAR_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackage === pkg.id
                  const calculatedPrice = pkg.basePrice + currentVehicle.surcharge

                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`text-left p-5 rounded-lg border-2 transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-brand bg-red-50/20 shadow-md ring-1 ring-brand'
                          : 'border-rule bg-white hover:border-ink/50'
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-2.5 right-4 bg-brand text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm">
                          Most Popular
                        </span>
                      )}

                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-mist px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                            {pkg.tag}
                          </span>
                          <span className="font-display text-2xl font-bold tracking-wide text-brand">
                            ${calculatedPrice}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl uppercase tracking-wide text-ink mt-2">
                          {pkg.title}
                        </h3>

                        <p className="text-[13px] text-muted mt-2 leading-relaxed">
                          {pkg.summary}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-rule/60 flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-ink">
                          {isSelected ? '✓ Selected' : 'Tap to select'}
                        </span>
                        <span className="text-[11px] text-muted">
                          (Includes {currentVehicle.name})
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Add-Ons Multi-Select */}
              <div className="border-t border-rule pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-display text-xl uppercase tracking-wide text-ink">
                      A La Carte <span className="text-brand">Add-Ons</span>
                    </h4>
                    <p className="text-[12px] text-muted">
                      Select optional extra treatments for your appointment.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand">
                    {selectedAddons.length} Selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ADD_ONS.map((add) => {
                    const isChecked = selectedAddons.includes(add.id)

                    return (
                      <div
                        key={add.id}
                        onClick={() => toggleAddon(add.id)}
                        className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isChecked
                            ? 'border-brand bg-red-50/40 shadow-sm'
                            : 'border-rule bg-white hover:border-ink/40'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl shrink-0 mt-0.5">{add.icon}</span>
                          <div>
                            <span className="font-semibold text-ink text-[13px] block">
                              {add.title}
                            </span>
                            <span className="text-[11px] text-muted block leading-snug">
                              {add.desc}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0 flex flex-col items-end">
                          <span className="font-display text-lg font-bold text-brand">
                            +${add.price}
                          </span>
                          <span
                            className={`h-4 w-4 rounded border flex items-center justify-center text-[10px] font-bold ${
                              isChecked
                                ? 'bg-brand text-white border-brand'
                                : 'border-rule bg-white'
                            }`}
                          >
                            {isChecked && '✓'}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SCHEDULE & LOCATION */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="eyebrow-plain text-brand">Step 3 of 4</span>
                <h2 className="font-display text-3xl uppercase tracking-wide text-ink mt-1">
                  Location &amp; <span className="text-brand">Preferred Time</span>
                </h2>
                <p className="text-[14px] text-muted mt-1">
                  We come directly to your driveway, office, or marina with our own water and power.
                </p>
              </div>

              {/* Location Type */}
              <div>
                <label className="field-label">Where should we perform the detail?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {LOCATION_TYPES.map((loc) => {
                    const isSelected = locationType === loc.id
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setLocationType(loc.id)}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          isSelected
                            ? 'border-brand bg-red-50/40 text-brand ring-1 ring-brand font-bold'
                            : 'border-rule bg-white text-ink hover:border-ink/50'
                        }`}
                      >
                        <span className="text-xl block mb-1">{loc.icon}</span>
                        <span className="text-[12px] uppercase tracking-wider">{loc.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Address Input */}
              <div>
                <label className="field-label">
                  Service Address or Town/ZIP <span className="text-brand">*</span>
                </label>
                <input
                  className="field"
                  placeholder="e.g. 123 Main St, Newburgh, NY 12550"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                    setErrors({ ...errors, address: '' })
                  }}
                />
                {errors.address && (
                  <span className="text-[12px] text-brand font-medium mt-1.5 block">
                    {errors.address}
                  </span>
                )}

                {/* Quick Town Filler */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-muted font-medium">Quick towns:</span>
                  {QUICK_TOWNS.map((town) => (
                    <button
                      key={town}
                      type="button"
                      onClick={() => setAddress(address ? `${address}, ${town}` : town)}
                      className="px-2 py-0.5 rounded bg-mist text-ink hover:bg-brand hover:text-white transition-colors"
                    >
                      {town}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-rule pt-5">
                <div>
                  <label className="field-label">
                    Preferred Date <span className="text-brand">*</span>
                  </label>
                  <input
                    type="date"
                    className="field"
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                  />
                  <span className="text-[11px] text-muted mt-1 block">
                    Open Mon–Sat 8:00 AM – 6:00 PM (Sunday by appointment)
                  </span>
                </div>

                <div>
                  <label className="field-label">Preferred Time Window</label>
                  <div className="space-y-2">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = timeSlot === slot.id
                      return (
                        <div
                          key={slot.id}
                          onClick={() => setTimeSlot(slot.id)}
                          className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-brand bg-red-50/40 text-brand font-semibold ring-1 ring-brand'
                              : 'border-rule bg-white text-ink hover:border-ink/50'
                          }`}
                        >
                          <div className="flex items-center gap-2 text-[13px]">
                            <span>{slot.icon}</span>
                            <span>{slot.label}</span>
                          </div>
                          <span className="text-[11px] text-muted">{slot.time}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded bg-mist p-3.5 flex items-center gap-3 text-[13px] text-muted border-l-2 border-brand">
                <MapPin width={18} height={18} className="text-brand shrink-0" />
                <span>
                  <strong>Mobile travel guarantee:</strong> We carry our own water tank and electricity generator. No exterior faucets or electrical hookups required at your property.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & REVIEW */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="eyebrow-plain text-brand">Step 4 of 4</span>
                <h2 className="font-display text-3xl uppercase tracking-wide text-ink mt-1">
                  Contact Info &amp; <span className="text-brand">Review</span>
                </h2>
                <p className="text-[14px] text-muted mt-1">
                  Confirm your details so Mike can send SMS confirmations and coordinate timing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">
                    Full Name <span className="text-brand">*</span>
                  </label>
                  <input
                    className="field"
                    placeholder="First & Last Name"
                    value={clientInfo.name}
                    onChange={(e) => {
                      setClientInfo({ ...clientInfo, name: e.target.value })
                      setErrors({ ...errors, name: '' })
                    }}
                  />
                  {errors.name && (
                    <span className="text-[12px] text-brand font-medium mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="field-label">
                    Mobile Phone (For Text Confirmation) <span className="text-brand">*</span>
                  </label>
                  <input
                    className="field"
                    placeholder="(845) 000-0000"
                    inputMode="tel"
                    value={clientInfo.phone}
                    onChange={(e) => {
                      setClientInfo({ ...clientInfo, phone: e.target.value })
                      setErrors({ ...errors, phone: '' })
                    }}
                  />
                  {errors.phone && (
                    <span className="text-[12px] text-brand font-medium mt-1 block">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="field-label">Email Address (For Appointment Receipt)</label>
                  <input
                    className="field"
                    placeholder="you@email.com"
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) =>
                      setClientInfo({ ...clientInfo, email: e.target.value })
                    }
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="field-label">
                    Special Notes, Gate Codes or Key Areas of Focus
                  </label>
                  <textarea
                    className="field"
                    rows={2}
                    placeholder="e.g. Gate code #4521, focus on coffee stains in passenger seat, water hose not accessible (no problem!)..."
                    value={clientInfo.notes}
                    onChange={(e) =>
                      setClientInfo({ ...clientInfo, notes: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Order Summary Review Box */}
              <div className="border border-brand/30 bg-[#fafafa] rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-rule pb-3">
                  <span className="font-display text-xl uppercase tracking-wide text-ink">
                    Booking Summary
                  </span>
                  <span className="font-display text-2xl font-bold text-brand">
                    Est. Total: ${estimatedTotal}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[13px]">
                  <div>
                    <span className="text-muted block">Vehicle:</span>
                    <span className="font-semibold text-ink">
                      {vehicleDetails.year || vehicleDetails.make
                        ? `${vehicleDetails.year} ${vehicleDetails.make} ${vehicleDetails.model}`.trim()
                        : currentVehicle.name}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted block">Package:</span>
                    <span className="font-semibold text-brand">{currentPackage.title}</span>
                  </div>

                  <div>
                    <span className="text-muted block">Date &amp; Window:</span>
                    <span className="font-semibold text-ink">
                      {serviceDate} ({TIME_SLOTS.find((t) => t.id === timeSlot)?.label})
                    </span>
                  </div>

                  <div>
                    <span className="text-muted block">Location:</span>
                    <span className="font-semibold text-ink truncate block">
                      {address || 'Hudson Valley'} (
                      {LOCATION_TYPES.find((l) => l.id === locationType)?.label})
                    </span>
                  </div>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="pt-2 border-t border-rule text-[12px]">
                    <span className="text-muted font-medium">Selected Add-Ons:</span>{' '}
                    <span className="text-ink font-semibold">
                      {selectedAddons
                        .map((id) => ADD_ONS.find((a) => a.id === id)?.title)
                        .join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: BOOKING CONFIRMED SCREEN */}
          {step === 5 && (
            <div className="py-6 text-center space-y-6">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white shadow-lift animate-bounce">
                <Check width={40} height={40} />
              </div>

              <div>
                <span className="rounded-full bg-mist px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand border border-rule">
                  Reference ID: {bookingRef}
                </span>
                <h2 className="font-display text-4xl uppercase tracking-wide text-ink mt-3">
                  Your Detail Appointment <span className="text-brand">Is Reserved!</span>
                </h2>
                <p className="text-[15px] text-muted max-w-lg mx-auto mt-2 leading-relaxed">
                  Thank you, <span className="font-bold text-ink">{clientInfo.name}</span>! Mike at E-Z Street Mobile Detailing has received your booking request for{' '}
                  <span className="font-semibold text-ink">{currentPackage.title}</span> on{' '}
                  <span className="font-semibold text-ink">{serviceDate}</span>.
                </p>
              </div>

              {/* What Happens Next Timeline */}
              <div className="max-w-md mx-auto rounded-xl border border-rule bg-mist p-5 text-left space-y-3.5">
                <span className="font-alt text-[12px] font-bold uppercase tracking-[0.18em] text-brand block">
                  What Happens Next:
                </span>
                <div className="flex items-start gap-3 text-[13px]">
                  <span className="h-5 w-5 rounded-full bg-ink text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <span className="text-ink">
                    We will send an <strong>SMS text confirmation</strong> to {clientInfo.phone}.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-[13px]">
                  <span className="h-5 w-5 rounded-full bg-ink text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <span className="text-ink">
                    Mike will review your vehicle specs &amp; confirm the exact arrival window.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-[13px]">
                  <span className="h-5 w-5 rounded-full bg-brand text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <span className="text-ink">
                    Our self-contained mobile detailing unit pulls up to your driveway!
                  </span>
                </div>
              </div>

              {/* Quick Contact & Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={`tel:+${business.phoneRaw}`}
                  className="btn-red !py-3 !px-6 text-[13px]"
                >
                  <Phone width={16} height={16} /> Call Mike {business.phone}
                </a>
                <a
                  href={`sms:+${business.phoneRaw}`}
                  className="btn-outline !py-3 !px-6 text-[13px]"
                >
                  <Message width={16} height={16} /> Send SMS Update
                </a>
                <button
                  type="button"
                  onClick={closeBooking}
                  className="btn-outline !py-3 !px-6 text-[13px]"
                >
                  Back to Website
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        {step < 5 && (
          <div className="bg-white px-6 py-4 border-t border-rule flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn-outline !py-2.5 !px-5 text-[12px]"
              >
                ← Back
              </button>
            ) : (
              <button
                type="button"
                onClick={closeBooking}
                className="btn-outline !py-2.5 !px-5 text-[12px]"
              >
                Cancel
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-red !py-2.5 !px-6 text-[12px]"
              >
                Continue to Step {step + 1} <ArrowRight width={16} height={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="btn-red !py-2.5 !px-8 text-[13px] tracking-wider"
              >
                Confirm &amp; Reserve Booking (${estimatedTotal}) <Check width={16} height={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
