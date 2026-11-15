import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

const rooms = [
  {
    id: 1,
    name: 'Ocean View Suite',
    price: 220,
    badge: 'Most popular',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    description:
      'A spacious coastal suite with a private balcony, panoramic sea views, and sunrise breakfast on the terrace.',
    features: ['King bed', 'Breakfast included', 'Private balcony'],
  },
  {
    id: 2,
    name: 'Garden Family Room',
    price: 180,
    badge: 'Family favourite',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
    description:
      'Comfortable family accommodation with garden views, a lounge area, and easy access to the pool area.',
    features: ['Two queen beds', 'Pool access', 'Family lounge'],
  },
  {
    id: 3,
    name: 'Harbour Deluxe Loft',
    price: 260,
    badge: 'Luxury stay',
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
    description:
      'A designer loft with harbour views, a rainfall shower, and premium wellness amenities for a restful escape.',
    features: ['Rainfall shower', 'Harbour view', 'Spa access'],
  },
]

const amenities = [
  '24-hour concierge desk',
  'Infinity pool and sauna',
  'Private beach transfers',
  'On-site restaurant and bar',
  'Conference Rooms and event spaces',
  'Gym and Spa',
]

const aboutHighlights = [
  {
    title: 'Our story',
    text: 'Jamaica Hilton Hotel began as a small coastal retreat and has grown into a refined destination known for warm hospitality and memorable seaside stays.',
  },
  {
    title: 'Our mission',
    text: 'We blend comfort, personalized service, and local culture to create effortless guest experiences from arrival to departure.',
  },
  {
    title: 'Our vision',
    text: 'To become the preferred choice for travellers seeking a peaceful, stylish, and sustainable coastal getaway.',
  },
]

const stats = [
  { value: '12+', label: 'Years hosting guests' },
  { value: '4.9/5', label: 'Average guest rating' },
  { value: '98%', label: 'Repeat visitors' },
]

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Contact', to: '/contact' },
]

const contactDetails = {
  email: 'jamaicahilton@gmail.com',
  phone: '+234 814 602 3008',
  address: '4, Cape Town, South Africa',
}

const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 1

  const startDate = new Date(checkIn)
  const endDate = new Date(checkOut)
  const differenceInDays = (endDate - startDate) / (1000 * 60 * 60 * 24)

  return differenceInDays > 0 ? differenceInDays : 1
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand" to="/">
          Jamaica Hilton Hotel
        </NavLink>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink className="button primary small" to="/rooms">
          Book now
        </NavLink>
      </div>
    </header>
  )
}

function HomePage() {
  const [bookingData, setBookingData] = useState({
    room: rooms[0].name,
    checkIn: '2026-11-20',
    checkOut: '2026-11-23',
    guests: 2,
  })
  const [savedBooking, setSavedBooking] = useState('')

  useEffect(() => {
    const storedBooking = localStorage.getItem('jamaica-hilton-hotel-booking')

    if (storedBooking) {
      setBookingData(JSON.parse(storedBooking))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'jamaica-hilton-hotel-booking',
      JSON.stringify(bookingData),
    )
  }, [bookingData])

  const selectedRoom = rooms.find((room) => room.name === bookingData.room) || rooms[0]
  const nights = calculateNights(bookingData.checkIn, bookingData.checkOut)
  const total = selectedRoom.price * nights

  const handleChange = (event) => {
    const { name, value } = event.target
    setBookingData((currentBooking) => ({
      ...currentBooking,
      [name]: value,
    }))
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Oceanfront comfort</span>
          <h1>Welcome to Jamaica Hilton Hotel</h1>
          <p>
            Discover a calm coastal escape where luxury, comfort, and warm South
            African hospitality meet the rhythm of the sea.
          </p>

          <div className="hero-actions">
            <NavLink className="button primary" to="/rooms">
              Explore stays
            </NavLink>
            <NavLink className="button secondary" to="/about">
              About us
            </NavLink>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="booking-panel">
          <h2>Check availability</h2>

          <div className="form-grid">
            <label>
              Room type
              <select name="room" value={bookingData.room} onChange={handleChange}>
                {rooms.map((room) => (
                  <option key={room.id} value={room.name}>
                    {room.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Guests
              <select name="guests" value={bookingData.guests} onChange={handleChange}>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={5}>5 Guests</option>
              </select>
            </label>

            <label>
              Check-in
              <input
                type="date"
                name="checkIn"
                value={bookingData.checkIn}
                onChange={handleChange}
              />
            </label>

            <label>
              Check-out
              <input
                type="date"
                name="checkOut"
                value={bookingData.checkOut}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="booking-summary">
            <div>
              <span>Stay</span>
              <strong>{nights} nights</strong>
            </div>
            <div>
              <span>Estimated total</span>
              <strong>R{total}</strong>
            </div>
          </div>

          <button
            type="button"
            className="button primary full-width"
            onClick={() => setSavedBooking(`${bookingData.room} for ${nights} nights`)}
          >
            Save my stay
          </button>

          {savedBooking && (
            <p className="saved-message">Saved: {savedBooking}</p>
          )}
        </aside>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <span className="eyebrow">Why guests choose us</span>
          <h2>Thoughtful services designed for every kind of stay</h2>
        </div>

        <div className="feature-grid">
          {amenities.map((amenity) => (
            <div key={amenity} className="feature-card">
              <span className="feature-icon">✓</span>
              <p>{amenity}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function AboutPage() {
  return (
    <section className="page-section">
      <div className="section-heading narrow">
        <span className="eyebrow">About our hotel</span>
        <h2>A peaceful stay inspired by coastal living</h2>
      </div>

      <div className="about-layout">
        <div className="about-copy">
          <p>
            Jamaica Hilton Hotel is a boutique seaside destination where every guest is
            welcomed with thoughtful service and a strong sense of place. Since our
            early beginnings, we have focused on creating restful moments and
            memorable experiences for visitors seeking both luxury and ease.
          </p>
          <p>
            From sunrise breakfasts to sunset dinners, our team is dedicated to making
            each stay effortless, warm, and genuinely personal.
          </p>
        </div>

        <img
          className="about-image"
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80"
          alt="Jamaica Hilton hotel exterior"
        />
      </div>

      <div className="info-grid">
        {aboutHighlights.map((item) => (
          <article key={item.title} className="info-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0].name)

  return (
    <section className="page-section">
      <div className="section-heading">
        <span className="eyebrow">Our rooms</span>
        <h2>Choose the perfect stay for your trip</h2>
      </div>

      <div className="room-grid">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            selectedRoom={selectedRoom}
            onSelect={setSelectedRoom}
          />
        ))}
      </div>
    </section>
  )
}

function RoomCard({ room, selectedRoom, onSelect }) {
  const isSelected = selectedRoom === room.name

  return (
    <article className={`room-card ${isSelected ? 'selected' : ''}`}>
      <img src={room.image} alt={room.name} />

      <div className="room-body">
        <span className="room-badge">{room.badge}</span>
        <h3>{room.name}</h3>
        <p>{room.description}</p>

        <ul className="feature-list">
          {room.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div className="room-footer">
          <strong>From R{room.price}/night</strong>
          <button type="button" className="button secondary" onClick={() => onSelect(room.name)}>
            {isSelected ? 'Selected' : 'Choose room'}
          </button>
        </div>
      </div>
    </article>
  )
}

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.subject.trim()) {
      nextErrors.subject = 'Subject is required.'
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Message is required.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatusMessage('Please correct the highlighted fields and try again.')
      return
    }

    setStatusMessage(`Thanks ${formData.fullName}! Your request has been sent successfully.`)
    setFormData({ fullName: '', email: '', subject: '', message: '' })
    setErrors({})
  }

  return (
    <section className="page-section contact-page">
      <div className="section-heading narrow">
        <span className="eyebrow">Contact us</span>
        <h2>Plan your next seaside escape</h2>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Get in touch</h3>
          <p>
            We would love to help you plan the ideal stay. Reach out anytime for
            reservations, special requests, or venue information.
          </p>

          <ul className="contact-list">
            <li>
              <strong>Email:</strong> {contactDetails.email}
            </li>
            <li>
              <strong>Phone:</strong> {contactDetails.phone}
            </li>
            <li>
              <strong>Address:</strong> {contactDetails.address}
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label>
            Full name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your name"
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </label>

          <label>
            Email address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </label>

          <label>
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Booking enquiry"
            />
            {errors.subject && <span className="error-text">{errors.subject}</span>}
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Tell us about your stay"
            />
            {errors.message && <span className="error-text">{errors.message}</span>}
          </label>

          <button type="submit" className="button primary full-width">
            Submit enquiry
          </button>

          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© 2026 Jamaica Hilton Hotel</p>
        <p>Book memorable coastal stays with comfort, care and style.</p>
      </div>
    </footer>
  )
}

export default App
