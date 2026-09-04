/*
    Furina Site
    Homepage interactions.

    Everything here works directly through file:// so the site can
    be developed locally without a server or build system.
*/

const header = document.querySelector('.site-header')

const mobileNavButton = document.getElementById('mobileNavButton')

const mobileNav = document.getElementById('mobileNav')

const heroShowcase = document.getElementById('heroShowcase')

const mockStatusText = document.getElementById('mockStatusText')

/* =============================================================
   HEADER
============================================================= */

function updateHeader() {
  if (!header) {
    return
  }

  header.classList.toggle('is-scrolled', window.scrollY > 18)
}

window.addEventListener('scroll', updateHeader, {
  passive: true
})

updateHeader()

/* =============================================================
   MOBILE NAVIGATION
============================================================= */

function setMobileNavigation(open) {
  if (!mobileNav || !mobileNavButton) {
    return
  }

  mobileNav.classList.toggle('is-open', open)

  mobileNavButton.setAttribute('aria-expanded', String(open))

  mobileNav.setAttribute('aria-hidden', String(!open))
}

mobileNavButton?.addEventListener('click', () => {
  const open = !mobileNav.classList.contains('is-open')

  setMobileNavigation(open)
})

mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    setMobileNavigation(false)
  })
})

/* =============================================================
   SCROLL REVEALS
============================================================= */

const revealElements = Array.from(document.querySelectorAll('.reveal'))

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return
        }

        entry.target.classList.add('is-visible')

        revealObserver.unobserve(entry.target)
      })
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  )

  revealElements.forEach(element => {
    revealObserver.observe(element)
  })
} else {
  revealElements.forEach(element => {
    element.classList.add('is-visible')
  })
}

/* =============================================================
   HERO PARALLAX
============================================================= */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

function resetHeroParallax() {
  heroShowcase?.querySelectorAll('[data-depth]').forEach(element => {
    element.style.translate = ''
  })
}

function handleHeroPointerMove(event) {
  if (!heroShowcase || reduceMotion.matches) {
    return
  }

  const bounds = heroShowcase.getBoundingClientRect()

  const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5

  const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5

  heroShowcase.querySelectorAll('[data-depth]').forEach(element => {
    const depth = Number(element.dataset.depth) || 0

    const x = normalizedX * depth

    const y = normalizedY * depth

    element.style.translate = `${x}px ${y}px`
  })
}

heroShowcase?.addEventListener('pointermove', handleHeroPointerMove)

heroShowcase?.addEventListener('pointerleave', resetHeroParallax)

/* =============================================================
   MOCK FURINA WINDOW
============================================================= */

document.querySelectorAll('.mock-action').forEach(button => {
  button.addEventListener('click', () => {
    const status = button.dataset.mockStatus || 'Ready.'

    if (mockStatusText) {
      mockStatusText.textContent = status
    }

    button.animate(
      [
        {
          transform: 'translateY(-3px) scale(1)'
        },
        {
          transform: 'translateY(-3px) scale(0.97)'
        },
        {
          transform: 'translateY(-3px) scale(1)'
        }
      ],
      {
        duration: 190,

        easing: 'ease-out'
      }
    )
  })
})
