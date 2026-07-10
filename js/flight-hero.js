(() => {
  'use strict'

  const AIRPORTS = {
    ADD: ['Addis Ababa', 8.978, 38.799],
    AKL: ['Auckland', -37.008, 174.792],
    AMS: ['Amsterdam', 52.310, 4.768],
    AUH: ['Abu Dhabi', 24.433, 54.651],
    BKK: ['Bangkok', 13.690, 100.750],
    BOG: ['Bogota', 4.701, -74.147],
    BOS: ['Boston', 42.365, -71.010],
    CAI: ['Cairo', 30.121, 31.406],
    CDG: ['Paris', 49.010, 2.548],
    CMN: ['Casablanca', 33.368, -7.590],
    CPH: ['Copenhagen', 55.618, 12.656],
    CPT: ['Cape Town', -33.970, 18.597],
    DEL: ['Delhi', 28.556, 77.100],
    DOH: ['Doha', 25.273, 51.608],
    DPS: ['Bali', -8.748, 115.167],
    DUB: ['Dublin', 53.428, -6.244],
    DXB: ['Dubai', 25.253, 55.365],
    EWR: ['Newark', 40.690, -74.175],
    EZE: ['Buenos Aires', -34.822, -58.536],
    FCO: ['Rome', 41.800, 12.239],
    FRA: ['Frankfurt', 50.038, 8.562],
    GRU: ['Sao Paulo', -23.435, -46.473],
    HEL: ['Helsinki', 60.317, 24.963],
    HKG: ['Hong Kong', 22.308, 113.918],
    HND: ['Tokyo', 35.549, 139.780],
    IAD: ['Washington', 38.953, -77.457],
    ICN: ['Seoul', 37.460, 126.441],
    IST: ['Istanbul', 41.275, 28.751],
    JED: ['Jeddah', 21.670, 39.153],
    JFK: ['New York', 40.641, -73.778],
    JNB: ['Johannesburg', -26.133, 28.242],
    KEF: ['Reykjavik', 63.985, -22.606],
    LAX: ['Los Angeles', 33.942, -118.408],
    LHR: ['London', 51.470, -0.454],
    LIM: ['Lima', -12.022, -77.114],
    LIS: ['Lisbon', 38.775, -9.135],
    LOS: ['Lagos', 6.577, 3.321],
    MAD: ['Madrid', 40.498, -3.568],
    MEL: ['Melbourne', -37.669, 144.841],
    MLE: ['Male', 4.192, 73.529],
    MNL: ['Manila', 14.509, 121.020],
    MCT: ['Muscat', 23.593, 58.284],
    MRU: ['Mauritius', -20.430, 57.683],
    NBO: ['Nairobi', -1.319, 36.928],
    NRT: ['Tokyo Narita', 35.772, 140.393],
    ORD: ['Chicago', 41.974, -87.907],
    PEK: ['Beijing', 40.080, 116.585],
    PVG: ['Shanghai', 31.145, 121.808],
    SEA: ['Seattle', 47.450, -122.309],
    SEZ: ['Seychelles', -4.674, 55.522],
    SFO: ['San Francisco', 37.621, -122.379],
    SIN: ['Singapore', 1.364, 103.991],
    SCL: ['Santiago', -33.393, -70.786],
    SYD: ['Sydney', -33.940, 151.175],
    TPE: ['Taipei', 25.080, 121.233],
    YYZ: ['Toronto', 43.677, -79.631],
    YVR: ['Vancouver', 49.196, -123.181],
    ZNZ: ['Zanzibar', -6.222, 39.225],
    ZRH: ['Zurich', 47.458, 8.555]
  }

  const ROUTE_PAIRS = [
    // Transatlantic
    'LHR-JFK', 'CDG-JFK', 'FRA-JFK', 'AMS-JFK', 'MAD-JFK',
    'FCO-JFK', 'DUB-JFK', 'LIS-JFK', 'LHR-BOS', 'LHR-IAD',
    'LHR-ORD', 'LHR-LAX', 'LHR-SFO', 'CDG-LAX', 'FRA-SFO',
    'AMS-YYZ', 'ZRH-YVR', 'KEF-JFK', 'CPH-EWR', 'IST-JFK',
    // Transpacific
    'HND-LAX', 'HND-SFO', 'NRT-SEA', 'HND-JFK', 'ICN-LAX',
    'ICN-SFO', 'ICN-JFK', 'PVG-LAX', 'PVG-SFO', 'PEK-LAX',
    'HKG-LAX', 'HKG-SFO', 'TPE-LAX', 'TPE-SFO', 'SIN-SFO',
    'MNL-LAX', 'SYD-LAX', 'SYD-SFO', 'MEL-LAX', 'AKL-LAX',
    // Europe to Asia
    'LHR-SIN', 'LHR-HKG', 'LHR-HND', 'LHR-ICN', 'LHR-DEL',
    'CDG-HND', 'CDG-SIN', 'CDG-BKK', 'FRA-HND', 'FRA-SIN',
    'AMS-SIN', 'AMS-BKK', 'ZRH-SIN', 'HEL-HND', 'IST-SIN',
    // Middle East hubs
    'DXB-LHR', 'DXB-CDG', 'DXB-JFK', 'DXB-SYD', 'DXB-SIN',
    'DOH-LHR', 'DOH-JFK', 'DOH-SYD', 'DOH-CPT', 'AUH-LHR',
    'MCT-LHR', 'JED-LHR', 'DXB-AKL', 'DOH-AKL', 'DOH-MLE',
    // Africa and Indian Ocean
    'LHR-JNB', 'LHR-CPT', 'CDG-JNB', 'AMS-NBO', 'ADD-DXB',
    'CAI-LHR', 'CMN-JFK', 'JNB-SYD', 'JNB-GRU', 'NBO-DXB',
    'ADD-LHR', 'MRU-CDG', 'SEZ-DXB', 'ZNZ-DOH', 'LOS-LHR',
    // Asia, Oceania, and South America
    'SIN-HKG', 'SIN-HND', 'SIN-SYD', 'HKG-SYD', 'BKK-HND',
    'BKK-SIN', 'DPS-SYD', 'GRU-LIS', 'GRU-MAD', 'GRU-JFK',
    'EZE-MAD', 'SCL-AKL', 'SCL-MAD', 'LIM-MAD', 'BOG-MAD'
  ]

  const toRadians = value => value * Math.PI / 180

  const distanceBetween = (from, to) => {
    const latDelta = toRadians(to[1] - from[1])
    const lonDelta = toRadians(to[2] - from[2])
    const fromLat = toRadians(from[1])
    const toLat = toRadians(to[1])
    const a = Math.sin(latDelta / 2) ** 2 +
      Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lonDelta / 2) ** 2
    return Math.round(6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)))
  }

  const formatDuration = distance => {
    const totalMinutes = Math.round((distance / 860 + 0.7) * 60)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`
  }

  const initFlightHero = () => {
    const header = document.querySelector('#page-header.flight-cover')
    if (!header || header.dataset.flightReady === 'true') return

    const canvas = document.querySelector('#flight-sky')
    const routeElement = document.querySelector('#flight-route')
    const nextButton = document.querySelector('#flight-route-next')
    if (!canvas || !routeElement || !nextButton) return

    header.dataset.flightReady = 'true'

    const fields = {
      fromCode: document.querySelector('#flight-from-code'),
      fromCity: document.querySelector('#flight-from-city'),
      toCode: document.querySelector('#flight-to-code'),
      toCity: document.querySelector('#flight-to-city'),
      distance: document.querySelector('#flight-distance'),
      level: document.querySelector('#flight-level'),
      duration: document.querySelector('#flight-duration')
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hour = new Date().getHours()
    if (hour < 6 || hour >= 20) header.classList.add('is-night')
    else if (hour < 8 || hour >= 17) header.classList.add('is-twilight')

    let currentRoute = -1
    let routeStartedAt = performance.now()
    let routeBaseProgress = 24
    let routeChanging = false
    let autoChangeTimer = null

    const renderRoute = index => {
      currentRoute = index
      const [fromCode, toCode] = ROUTE_PAIRS[index].split('-')
      const from = AIRPORTS[fromCode]
      const to = AIRPORTS[toCode]
      const distance = distanceBetween(from, to)
      const flightLevel = distance > 11000 ? 390 : distance > 6500 ? 370 : 350

      fields.fromCode.textContent = fromCode
      fields.fromCity.textContent = from[0]
      fields.toCode.textContent = toCode
      fields.toCity.textContent = to[0]
      fields.distance.textContent = `${distance.toLocaleString('en-US')} km`
      fields.level.textContent = `FL${flightLevel}`
      fields.duration.textContent = formatDuration(distance)

      routeBaseProgress = 22 + Math.random() * 18
      routeStartedAt = performance.now()
      header.style.setProperty('--flight-progress', `${routeBaseProgress.toFixed(2)}%`)
    }

    const chooseAnotherRoute = (immediate = false) => {
      if (routeChanging) return
      let nextRoute = currentRoute
      while (nextRoute === currentRoute) {
        nextRoute = Math.floor(Math.random() * ROUTE_PAIRS.length)
      }

      if (immediate) {
        renderRoute(nextRoute)
        return
      }

      routeChanging = true
      routeElement.classList.add('is-changing')
      window.setTimeout(() => {
        renderRoute(nextRoute)
        routeElement.classList.remove('is-changing')
        routeChanging = false
      }, 220)
    }

    chooseAnotherRoute(true)
    nextButton.addEventListener('click', () => chooseAnotherRoute())

    if (!reduceMotion) {
      autoChangeTimer = window.setInterval(() => chooseAnotherRoute(), 28000)
    }

    let pointerX = 0
    let pointerY = 0
    header.addEventListener('pointermove', event => {
      if (reduceMotion) return
      const rect = header.getBoundingClientRect()
      pointerX = (event.clientX - rect.left) / rect.width - 0.5
      pointerY = (event.clientY - rect.top) / rect.height - 0.5
      header.style.setProperty('--flight-x', `${(-pointerX * 12).toFixed(2)}px`)
      header.style.setProperty('--flight-y', `${(-pointerY * 8).toFixed(2)}px`)
    })

    header.addEventListener('pointerleave', () => {
      pointerX = 0
      pointerY = 0
      header.style.setProperty('--flight-x', '0px')
      header.style.setProperty('--flight-y', '0px')
    })

    const context = canvas.getContext('2d')
    let width = 0
    let height = 0
    let clouds = []
    let stars = []

    const resetScene = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = header.clientWidth
      height = header.clientHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const cloudCount = width < 768 ? 5 : 8
      clouds = Array.from({ length: cloudCount }, (_, index) => ({
        x: Math.random() * width,
        y: height * (0.22 + Math.random() * 0.56),
        radius: 90 + Math.random() * 110,
        speed: 0.025 + Math.random() * 0.055,
        opacity: 0.008 + Math.random() * 0.008,
        layer: index % 3
      }))

      stars = Array.from({ length: width < 768 ? 34 : 62 }, () => ({
        x: Math.random() * width * 0.62,
        y: height * (0.04 + Math.random() * 0.28),
        radius: 0.4 + Math.random() * 1.1,
        opacity: 0.2 + Math.random() * 0.5
      }))
    }

    const drawCloud = cloud => {
      const offsetX = pointerX * (cloud.layer + 1) * 10
      const offsetY = pointerY * (cloud.layer + 1) * 5
      const x = cloud.x + offsetX
      const y = cloud.y + offsetY
      const radius = cloud.radius

      context.save()
      context.filter = 'blur(26px)'
      context.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`
      context.beginPath()
      context.ellipse(x, y, radius * 2.1, radius * 0.32, 0, 0, Math.PI * 2)
      context.fill()
      context.restore()
    }

    const drawStars = timestamp => {
      const pulse = 0.78 + Math.sin(timestamp / 1800) * 0.14
      stars.forEach(star => {
        context.fillStyle = `rgba(255, 248, 222, ${star.opacity * pulse})`
        context.beginPath()
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        context.fill()
      })
    }

    const animate = timestamp => {
      if (!header.isConnected) {
        if (autoChangeTimer) window.clearInterval(autoChangeTimer)
        return
      }

      context.clearRect(0, 0, width, height)
      if (header.classList.contains('is-night')) drawStars(timestamp)

      clouds.forEach(cloud => {
        if (!reduceMotion) {
          cloud.x += cloud.speed * (cloud.layer + 1)
          if (cloud.x - cloud.radius * 2 > width) cloud.x = -cloud.radius * 2
        }
        drawCloud(cloud)
      })

      if (!reduceMotion && !routeChanging) {
        const elapsed = (timestamp - routeStartedAt) / 1000
        const progress = Math.min(88, routeBaseProgress + elapsed * 0.62)
        header.style.setProperty('--flight-progress', `${progress.toFixed(2)}%`)
      }

      window.requestAnimationFrame(animate)
    }

    resetScene()
    window.addEventListener('resize', resetScene, { passive: true })
    window.requestAnimationFrame(animate)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFlightHero, { once: true })
  } else {
    initFlightHero()
  }

  document.addEventListener('pjax:complete', initFlightHero)
})()
