/*
    Furina Documentation

    Shared interactions for documentation pages.

    Later, Director / Continuity / Story / Customize guides can
    reuse this same script and documentation shell.
*/

const docsSidebar = document.getElementById('docsSidebar')

const docsMobileNavButton = document.getElementById('docsMobileNavButton')

/* ============================================================
   MOBILE DOCUMENTATION NAVIGATION
============================================================ */

function setDocsNavigationOpen(open) {
  if (!docsSidebar || !docsMobileNavButton) {
    return
  }

  docsSidebar.classList.toggle('is-open', open)
  document.body.classList.toggle('docs-nav-open', open)
  docsMobileNavButton.setAttribute('aria-expanded', String(open))
  docsMobileNavButton.setAttribute(
    'aria-label',
    open ? 'Close documentation navigation' : 'Open documentation navigation'
  )
}

docsMobileNavButton?.addEventListener('click', () => {
  const open = !docsSidebar.classList.contains('is-open')

  setDocsNavigationOpen(open)
})

docsSidebar?.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener('click', () => {
    setDocsNavigationOpen(false)
  })
})

document.addEventListener('pointerdown', event => {
  if (
    !document.body.classList.contains('docs-nav-open') ||
    !docsSidebar ||
    !docsMobileNavButton
  )
    return
  if (
    docsSidebar.contains(event.target) ||
    docsMobileNavButton.contains(event.target)
  )
    return
  setDocsNavigationOpen(false)
})

document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    document.body.classList.contains('docs-nav-open')
  ) {
    setDocsNavigationOpen(false)
    docsMobileNavButton?.focus()
  }
})

window.addEventListener('resize', () => {
  if (
    window.innerWidth > 980 &&
    document.body.classList.contains('docs-nav-open')
  ) {
    setDocsNavigationOpen(false)
  }
})

/* ============================================================
   DOCUMENT READING PROGRESS
============================================================ */

const docsHeader = document.querySelector('.docs-header')

function updateDocsProgress() {
  if (!docsHeader) return
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  const progress =
    scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0
  docsHeader.style.setProperty('--docs-progress', `${progress * 100}%`)
}

window.addEventListener('scroll', updateDocsProgress, {passive: true})
window.addEventListener('resize', updateDocsProgress)
updateDocsProgress()

/* ============================================================
   DOCUMENTATION SCROLL SPY
============================================================ */

const docsNavLinks = Array.from(document.querySelectorAll('.docs-nav__link'))

const docsSections = docsNavLinks
  .map(link => {
    const href = link.getAttribute('href')

    if (!href || !href.startsWith('#')) {
      return null
    }

    return document.querySelector(href)
  })
  .filter(Boolean)

function setActiveDocsSection(id) {
  docsNavLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`)
  })
}

function updateActiveDocsSection() {
  if (docsSections.length === 0) {
    return
  }

  /*
        The documentation header is fixed.

        We use a reading line slightly below it and mark the
        most recent section that has crossed that line.
    */
  const readingLine = window.scrollY + 150

  let activeSection = docsSections[0]

  for (const section of docsSections) {
    if (section.offsetTop <= readingLine) {
      activeSection = section
    } else {
      break
    }
  }

  /*
        When the reader reaches the very bottom, always select
        the final documentation section.
    */
  const nearBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 24

  if (nearBottom) {
    activeSection = docsSections[docsSections.length - 1]
  }

  setActiveDocsSection(activeSection.id)
}

window.addEventListener('scroll', updateActiveDocsSection, {
  passive: true
})

window.addEventListener('resize', updateActiveDocsSection)

docsNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    const href = link.getAttribute('href')

    if (!href || !href.startsWith('#')) {
      return
    }

    /*
                    Highlight immediately on click instead of
                    waiting for the scroll event to catch up.
                */
    setActiveDocsSection(href.slice(1))
  })
})

updateActiveDocsSection()

/* ============================================================
   ESSENTIALS / FULL ATELIER DEMO
============================================================ */

const modeGuide = document.getElementById('modeGuide')

function setGuideMode(mode) {
  if (!modeGuide) {
    return
  }

  modeGuide.querySelectorAll('[data-mode]').forEach(button => {
    button.classList.toggle('is-active', button.dataset.mode === mode)
  })

  modeGuide.querySelectorAll('[data-mode-panel]').forEach(panel => {
    panel.classList.toggle('is-active', panel.dataset.modePanel === mode)
  })
}

modeGuide?.querySelectorAll('[data-mode]').forEach(button => {
  button.addEventListener('click', () => {
    setGuideMode(button.dataset.mode)
  })
})

/* ============================================================
   CUSTOMIZATION GUIDE
============================================================ */

/* ============================================================
   THEME SWATCHES
============================================================ */

const themeSwatches = Array.from(document.querySelectorAll('[data-demo-theme]'))

themeSwatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    themeSwatches.forEach(item => {
      item.classList.toggle('is-active', item === swatch)
    })
  })
})

/* ============================================================
   THEME SCOPE DEMO
============================================================ */

const scopeVisual = document.getElementById('scopeVisual')

const scopeButtons = Array.from(document.querySelectorAll('[data-scope]'))

function setDemoScope(scope) {
  if (!scopeVisual) {
    return
  }

  scopeVisual.dataset.scope = scope

  scopeButtons.forEach(button => {
    button.classList.toggle('is-active', button.dataset.scope === scope)
  })
}

scopeButtons.forEach(button => {
  button.addEventListener('click', () => {
    setDemoScope(button.dataset.scope)
  })
})

if (scopeVisual) {
  setDemoScope('global')
}

/* ============================================================
   BACKGROUND LAB
============================================================ */

const backgroundLab = document.getElementById('backgroundLab')

const backgroundPreview = document.getElementById('backgroundPreview')

const backgroundModeTitle = document.getElementById('backgroundModeTitle')

const backgroundModeDescription = document.getElementById(
  'backgroundModeDescription'
)

const darknessSlider = document.getElementById('darknessSlider')

const darknessValue = document.getElementById('darknessValue')

const blurSlider = document.getElementById('blurSlider')

const blurValue = document.getElementById('blurValue')

const parallaxToggle = document.getElementById('parallaxToggle')

const backgroundModes = {
  solid: {
    title: 'Solid Color',

    description: 'A simple, clean color behind the conversation.'
  },

  gradient: {
    title: 'Gradient',

    description: 'Blend colors together for a softer or more cinematic look.'
  },

  image: {
    title: 'Image / GIF',

    description: 'Use a hosted static image or animated GIF as the wallpaper.'
  },

  video: {
    title: 'Live Wallpaper',

    description: 'Use a looping video while keeping the chat fully interactive.'
  },

  character: {
    title: 'Character Image',

    description:
      "Let Furina use the current character artwork as this chat's background."
  }
}

function setBackgroundMode(mode) {
  if (!backgroundPreview || !backgroundModes[mode]) {
    return
  }

  backgroundPreview.dataset.mode = mode

  backgroundLab?.querySelectorAll('[data-background-mode]').forEach(button => {
    button.classList.toggle('is-active', button.dataset.backgroundMode === mode)
  })

  if (backgroundModeTitle) {
    backgroundModeTitle.textContent = backgroundModes[mode].title
  }

  if (backgroundModeDescription) {
    backgroundModeDescription.textContent = backgroundModes[mode].description
  }
}

backgroundLab?.querySelectorAll('[data-background-mode]').forEach(button => {
  button.addEventListener('click', () => {
    setBackgroundMode(button.dataset.backgroundMode)
  })
})

darknessSlider?.addEventListener('input', () => {
  const value = Number(darknessSlider.value)

  if (backgroundPreview) {
    backgroundPreview.style.setProperty('--demo-darkness', String(value / 100))
  }

  if (darknessValue) {
    darknessValue.textContent = `${value}%`
  }
})

blurSlider?.addEventListener('input', () => {
  const value = Number(blurSlider.value)

  if (backgroundPreview) {
    backgroundPreview.style.setProperty('--demo-blur', `${value}px`)
  }

  if (blurValue) {
    blurValue.textContent = `${value}px`
  }
})

/* ============================================================
   BACKGROUND PARALLAX
============================================================ */

const backgroundWallpaper = backgroundPreview?.querySelector(
  '.background-preview__wallpaper'
)

let parallaxFrame = null

function resetBackgroundParallax() {
  if (!backgroundWallpaper) {
    return
  }

  if (parallaxFrame) {
    cancelAnimationFrame(parallaxFrame)

    parallaxFrame = null
  }

  backgroundWallpaper.style.transform = 'translate3d(0px, 0px, 0) scale(1.04)'
}

function updateBackgroundParallax(event) {
  if (!backgroundPreview || !backgroundWallpaper || !parallaxToggle?.checked) {
    return
  }

  const bounds = backgroundPreview.getBoundingClientRect()

  const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5

  const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5

  /*
        Deliberately stronger than Furina's real parallax.

        This is documentation, so the effect should be obvious
        enough for the user to understand immediately.
    */
  const x = normalizedX * 30

  const y = normalizedY * 30

  if (parallaxFrame) {
    cancelAnimationFrame(parallaxFrame)
  }

  parallaxFrame = requestAnimationFrame(() => {
    backgroundWallpaper.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.04)`
  })
}

backgroundPreview?.addEventListener('pointermove', updateBackgroundParallax)

backgroundPreview?.addEventListener('pointerleave', resetBackgroundParallax)

parallaxToggle?.addEventListener('change', () => {
  if (!parallaxToggle.checked) {
    resetBackgroundParallax()
  }
})

resetBackgroundParallax()

/* ============================================================
   DIRECTOR GUIDE
============================================================ */

const directorViewTabs = Array.from(
  document.querySelectorAll('[data-director-view]')
)

const directorViewPanels = Array.from(
  document.querySelectorAll('[data-director-panel]')
)

function setDirectorView(view) {
  directorViewTabs.forEach(button => {
    button.classList.toggle('is-active', button.dataset.directorView === view)
  })

  directorViewPanels.forEach(panel => {
    panel.classList.toggle('is-active', panel.dataset.directorPanel === view)
  })
}

directorViewTabs.forEach(button => {
  button.addEventListener('click', () => {
    setDirectorView(button.dataset.directorView)
  })
})

/* ------------------------------------------------------------
   DIRECTOR PAYLOAD DEMO
------------------------------------------------------------- */

const directorPersistentToggle = document.getElementById(
  'directorPersistentToggle'
)

const directorCanonToggle = document.getElementById('directorCanonToggle')

const directorPayloadPreview = document.getElementById('directorPayloadPreview')

const directorSendDemo = document.getElementById('directorSendDemo')

function updateDirectorPayload() {
  if (!directorPayloadPreview) {
    return
  }

  const lines = []

  if (directorPersistentToggle?.checked) {
    lines.push(
      'RULE:',
      "- Never write dialogue, thoughts, decisions or actions for the user's character.",
      ''
    )
  }

  if (directorCanonToggle?.checked) {
    lines.push('CANON:', "- Aya's left arm is still injured.", '')
  }

  if (lines.length === 0) {
    directorPayloadPreview.textContent = 'I try to lift the old wooden box.'

    return
  }

  directorPayloadPreview.textContent = `ooc: furina-director:
[FURINA_DIRECTOR_NOTES]
${lines.join('\n').trim()}
[/FURINA_DIRECTOR_NOTES]

I try to lift the old wooden box.`
}

directorPersistentToggle?.addEventListener('change', updateDirectorPayload)

directorCanonToggle?.addEventListener('change', updateDirectorPayload)

directorSendDemo?.addEventListener('click', () => {
  updateDirectorPayload()

  setDirectorView('sent')
})

updateDirectorPayload()

/* ------------------------------------------------------------
   GUARD RAIL DEMO
------------------------------------------------------------- */

document.querySelectorAll('.guard-card').forEach(card => {
  card.addEventListener('click', () => {
    const enabled = card.classList.toggle('is-enabled')

    const icon = card.querySelector(':scope > span')

    if (icon) {
      icon.textContent = enabled ? '✓' : '+'
    }
  })
})

/* ------------------------------------------------------------
   DIRECTOR CUES
------------------------------------------------------------- */

const cueCards = Array.from(document.querySelectorAll('[data-cue]'))

const cueDemoStatus = document.getElementById('cueDemoStatus')

const cueAdvanceButton = document.getElementById('cueAdvanceButton')

let activeCue = 'turns'

let cueTurnCount = 3

function resetCueSimulation() {
  cueTurnCount = 3

  if (!cueDemoStatus) {
    return
  }

  if (activeCue === 'turns') {
    cueDemoStatus.textContent = 'Waiting: 3 turns remaining'
  } else if (activeCue === 'keyword') {
    cueDemoStatus.textContent = 'Waiting for keyword: "basement"'
  } else if (activeCue === 'character') {
    cueDemoStatus.textContent = 'Waiting for character signal: "Ren"'
  } else if (activeCue === 'next') {
    cueDemoStatus.textContent = 'Armed for the next reply'
  } else {
    cueDemoStatus.textContent = 'Waiting for manual activation'
  }
}

cueCards.forEach(card => {
  card.addEventListener('click', () => {
    activeCue = card.dataset.cue

    cueCards.forEach(item => {
      item.classList.toggle('is-active', item === card)
    })

    resetCueSimulation()
  })
})

cueAdvanceButton?.addEventListener('click', () => {
  if (!cueDemoStatus) {
    return
  }

  if (activeCue === 'turns') {
    cueTurnCount -= 1

    if (cueTurnCount <= 0) {
      cueDemoStatus.textContent = 'TRIGGERED → Someone knocks at the door.'

      cueTurnCount = 3
    } else {
      cueDemoStatus.textContent = `Waiting: ${cueTurnCount} turn${cueTurnCount === 1 ? '' : 's'} remaining`
    }

    return
  }

  if (activeCue === 'keyword') {
    cueDemoStatus.textContent =
      'TRIGGERED → "Basement" appeared. The lights go out.'
    return
  }

  if (activeCue === 'character') {
    cueDemoStatus.textContent =
      'TRIGGERED → Ren appeared in the latest assistant beat.'
    return
  }

  if (activeCue === 'next') {
    cueDemoStatus.textContent =
      'TRIGGERED → A phone starts ringing in the next reply.'
    return
  }

  cueDemoStatus.textContent = 'TRIGGERED → Reveal the letter.'
})

resetCueSimulation()

/* ============================================================
   CONTINUITY GUIDE
============================================================ */

/* ============================================================
   SELECTIVE MEMORY DEMO
============================================================ */

const memoryMessageOptions = Array.from(
  document.querySelectorAll('[data-memory-message]')
)

const memoryResultList = document.getElementById('memoryResultList')

const memorySelectionCount = document.getElementById('memorySelectionCount')

const memorySelections = {
  arm: [
    {
      category: 'INVENTORY & CONDITION',
      relevance: 'Strong match',
      title: "Aya's injured arm",
      text: "Aya's left arm is injured and hurts when she lifts something heavy."
    },
    {
      category: 'CHARACTER',
      relevance: 'Character match',
      title: 'Aya',
      text: 'Aya tends to hide pain rather than ask for help.'
    }
  ],

  key: [
    {
      category: 'OPEN THREAD',
      relevance: 'Strong match',
      title: 'The silver key',
      text: 'Mira gave Aya the silver key after refusing to return to the basement.'
    },
    {
      category: 'CHARACTER',
      relevance: 'Character match',
      title: 'Mira and the basement',
      text: 'Mira is afraid to enter the basement alone.'
    }
  ],

  rain: [
    {
      category: 'RELATIONSHIP',
      relevance: 'Character match',
      title: "Ren's current relationship with Aya",
      text: 'Aya no longer fully trusts Ren after his lie about the forest attack.'
    }
  ]
}

function renderMemorySelection(key) {
  if (!memoryResultList) {
    return
  }

  const memories = memorySelections[key] || []

  memoryResultList.innerHTML = ''

  memories.forEach(memory => {
    const card = document.createElement('article')

    card.className = 'memory-result'

    card.innerHTML = `
<div class="memory-result__top">
    <span>${memory.category}</span>
    <i>${memory.relevance}</i>
</div>

<strong>${memory.title}</strong>

<p>${memory.text}</p>
`

    memoryResultList.appendChild(card)
  })

  if (memorySelectionCount) {
    memorySelectionCount.textContent = `${memories.length} ${memories.length === 1 ? 'memory' : 'memories'}`
  }
}

memoryMessageOptions.forEach(button => {
  button.addEventListener('click', () => {
    memoryMessageOptions.forEach(option => {
      option.classList.toggle('is-active', option === button)
    })

    renderMemorySelection(button.dataset.memoryMessage)
  })
})

if (memoryResultList) {
  renderMemorySelection('arm')
}

/* ============================================================
   CONTEXT BUDGET DEMO
============================================================ */

const budgetOptions = Array.from(document.querySelectorAll('[data-budget]'))

const budgetLabel = document.getElementById('budgetLabel')

const budgetMeterFill = document.getElementById('budgetMeterFill')

const budgetExtraMemory = document.getElementById('budgetExtraMemory')

const budgetStates = {
  compact: {
    label: 'Compact',

    width: '31%',

    includeExtra: false
  },

  balanced: {
    label: 'Balanced',

    width: '58%',

    includeExtra: false
  },

  detailed: {
    label: 'Detailed',

    width: '88%',

    includeExtra: true
  }
}

function setBudgetDemo(budget) {
  const state = budgetStates[budget]

  if (!state) {
    return
  }

  budgetOptions.forEach(button => {
    button.classList.toggle('is-active', button.dataset.budget === budget)
  })

  if (budgetLabel) {
    budgetLabel.textContent = state.label
  }

  if (budgetMeterFill) {
    budgetMeterFill.style.width = state.width
  }

  if (budgetExtraMemory) {
    budgetExtraMemory.classList.toggle('is-included', state.includeExtra)

    budgetExtraMemory.classList.toggle('is-muted', !state.includeExtra)
  }
}

budgetOptions.forEach(button => {
  button.addEventListener('click', () => {
    setBudgetDemo(button.dataset.budget)
  })
})

/* ============================================================
   MEMORY CAPTURE DEMO
============================================================ */

const captureRememberButton = document.getElementById('captureRememberButton')

const captureInboxCard = document.getElementById('captureInboxCard')

const captureAcceptButton = document.getElementById('captureAcceptButton')

const captureDismissButton = document.getElementById('captureDismissButton')

function setCapturePending() {
  if (!captureInboxCard) {
    return
  }

  captureInboxCard.classList.remove('is-saved')

  captureInboxCard.classList.add('is-pending')

  captureInboxCard.innerHTML = `
<span class="capture-inbox-card__state">
    PENDING REVIEW
</span>

<strong>
    Mira is afraid to enter the basement alone.
</strong>

<p>
    Suggested from the current conversation.
    Review or edit before saving it as continuity.
</p>

<div class="capture-inbox-card__actions">

    <button
        id="captureAcceptButton"
        type="button"
    >
        Accept
    </button>

    <button
        id="captureDismissButton"
        type="button"
    >
        Dismiss
    </button>

</div>
`

  bindCaptureInboxButtons()
}

function setCaptureSaved() {
  if (!captureInboxCard) {
    return
  }

  captureInboxCard.classList.remove('is-pending')

  captureInboxCard.classList.add('is-saved')

  captureInboxCard.innerHTML = `
<span class="capture-inbox-card__state">
    SAVED TO CONTINUITY
</span>

<strong>
    Mira is afraid to enter the basement alone.
</strong>

<p>
    The reviewed memory is now available to the
    Continuity Vault.
</p>
`
}

function resetCaptureInbox() {
  if (!captureInboxCard) {
    return
  }

  captureInboxCard.classList.remove('is-pending', 'is-saved')

  captureInboxCard.innerHTML = `
<span class="capture-inbox-card__state">
    Waiting for capture
</span>

<strong>
    Nothing pending yet.
</strong>

<p>
    Use “Remember this” to create a reviewable
    continuity entry.
</p>

<div class="capture-inbox-card__actions">

    <button
        type="button"
        disabled
    >
        Accept
    </button>

    <button
        type="button"
        disabled
    >
        Dismiss
    </button>

</div>
`
}

function bindCaptureInboxButtons() {
  document
    .getElementById('captureAcceptButton')
    ?.addEventListener('click', setCaptureSaved)

  document
    .getElementById('captureDismissButton')
    ?.addEventListener('click', resetCaptureInbox)
}

captureRememberButton?.addEventListener('click', setCapturePending)

/* ============================================================
   STORY GUIDE
============================================================ */

const scenePresets = Array.from(
  document.querySelectorAll('[data-scene-preset]')
)

const scenePresetData = {
  station: {
    title: 'The Abandoned Station',
    number: 'SCENE 12',
    location: 'North Station',
    time: '11:47 PM',
    weather: 'Heavy rain',
    mood: 'Uneasy',
    present: 'Aya · Mira',
    objective: 'Find the missing journal',
    threat: 'Something is following them'
  },
  cafe: {
    title: 'Morning at the Café',
    number: 'SCENE 13',
    location: 'Old Town Café',
    time: '9:15 AM',
    weather: 'Cloudy',
    mood: 'Quiet',
    present: 'Aya · Ren',
    objective: 'Talk about what happened',
    threat: 'None'
  },
  rooftop: {
    title: 'The Rooftop Conversation',
    number: 'SCENE 14',
    location: 'Academy Rooftop',
    time: '6:32 PM',
    weather: 'Clear sunset',
    mood: 'Tense',
    present: 'Aya · Ren',
    objective: 'Get the truth from Ren',
    threat: 'The conversation may collapse'
  }
}

function setScenePreset(preset) {
  const data = scenePresetData[preset]
  if (!data) return

  scenePresets.forEach(button => {
    button.classList.toggle('is-active', button.dataset.scenePreset === preset)
  })

  const values = {
    sceneDemoTitle: data.title,
    sceneDemoNumber: data.number,
    sceneDemoLocation: data.location,
    sceneDemoTime: data.time,
    sceneDemoWeather: data.weather,
    sceneDemoMood: data.mood,
    sceneDemoPresent: data.present,
    sceneDemoObjective: data.objective,
    sceneDemoThreat: data.threat
  }

  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id)
    if (element) element.textContent = value
  })
}

scenePresets.forEach(button => {
  button.addEventListener('click', () =>
    setScenePreset(button.dataset.scenePreset)
  )
})

/* Scene Presentation --------------------------------------- */
const scenePresentationDemo = document.getElementById('scenePresentationDemo')
const scenePresentationStage = document.getElementById('scenePresentationStage')
const scenePresentationTransition = document.getElementById(
  'scenePresentationTransition'
)
const sceneTitleCardDemo = document.getElementById('sceneTitleCardDemo')
const sceneTransitionSelect = document.getElementById('sceneTransitionSelect')
const playScenePresentation = document.getElementById('playScenePresentation')
const sceneCardStyleButtons = Array.from(
  document.querySelectorAll('[data-scene-card-style]')
)
let scenePresentationTimer = null
let scenePresentationHideTimer = null

function syncScenePresentationCopy() {
  if (!scenePresentationStage) return

  const activePreset =
    scenePresets.find(button => button.classList.contains('is-active'))
      ?.dataset.scenePreset || 'station'
  const data = scenePresetData[activePreset] || scenePresetData.station

  const captionTitle = scenePresentationStage.querySelector(
    '.scene-presentation-caption strong'
  )
  const captionMeta = scenePresentationStage.querySelector(
    '.scene-presentation-caption span'
  )
  const cardLabel = sceneTitleCardDemo?.querySelector('small')
  const cardTitle = sceneTitleCardDemo?.querySelector('strong')
  const cardMeta = sceneTitleCardDemo?.querySelector('span')

  if (captionTitle) captionTitle.textContent = data.title
  if (captionMeta)
    captionMeta.textContent = `${data.number.replace('SCENE ', 'Scene ')} · ${data.location} · ${data.time}`
  if (cardLabel) cardLabel.textContent = data.number
  if (cardTitle) cardTitle.textContent = data.title
  if (cardMeta) cardMeta.textContent = `${data.location} · ${data.time}`
}

sceneCardStyleButtons.forEach(button => {
  button.addEventListener('click', () => {
    sceneCardStyleButtons.forEach(item =>
      item.classList.toggle('is-active', item === button)
    )

    if (scenePresentationStage)
      scenePresentationStage.dataset.cardStyle = button.dataset.sceneCardStyle
  })
})

function clearScenePresentationTimers() {
  if (scenePresentationTimer) {
    window.clearTimeout(scenePresentationTimer)
    scenePresentationTimer = null
  }
  if (scenePresentationHideTimer) {
    window.clearTimeout(scenePresentationHideTimer)
    scenePresentationHideTimer = null
  }
}

function resetScenePresentationDemo() {
  clearScenePresentationTimers()
  if (scenePresentationTransition) {
    scenePresentationTransition.classList.remove('is-running')
    scenePresentationTransition.removeAttribute('data-transition')
  }
  if (sceneTitleCardDemo) sceneTitleCardDemo.hidden = true
  if (playScenePresentation) {
    playScenePresentation.disabled = false
    playScenePresentation.classList.remove('is-running')
  }
}

function runScenePresentationDemo() {
  if (!scenePresentationTransition || !sceneTitleCardDemo) return

  clearScenePresentationTimers()
  syncScenePresentationCopy()

  const transition = sceneTransitionSelect?.value || 'fade-black'
  sceneTitleCardDemo.hidden = true
  scenePresentationTransition.classList.remove('is-running')
  scenePresentationTransition.dataset.transition = transition

  // Force a reflow so clicking Preview repeatedly always restarts the CSS animation.
  void scenePresentationTransition.offsetWidth
  scenePresentationTransition.classList.add('is-running')

  if (playScenePresentation) {
    playScenePresentation.disabled = true
    playScenePresentation.classList.add('is-running')
  }

  const prefersReducedMotion = window.matchMedia?.(
    '(prefers-reduced-motion: reduce)'
  ).matches

  const cardDelay = prefersReducedMotion ? 40 : 360
  const cardDuration = prefersReducedMotion ? 900 : 1750

  scenePresentationTimer = window.setTimeout(() => {
    sceneTitleCardDemo.hidden = false

    // Re-trigger the title-card entrance animation on every preview.
    sceneTitleCardDemo.style.animation = 'none'
    void sceneTitleCardDemo.offsetWidth
    sceneTitleCardDemo.style.animation = ''

    scenePresentationHideTimer = window.setTimeout(() => {
      resetScenePresentationDemo()
    }, cardDuration)
  }, cardDelay)
}

playScenePresentation?.addEventListener('click', runScenePresentationDemo)

scenePresentationTransition?.addEventListener('animationend', () => {
  scenePresentationTransition.classList.remove('is-running')
})

// Keep the presentation example synchronized with the Scene State preset above.
scenePresets.forEach(button =>
  button.addEventListener('click', syncScenePresentationCopy)
)

syncScenePresentationCopy()

const sceneWorkflowSteps = Array.from(
  document.querySelectorAll('[data-scene-stage]')
)
const sceneWorkflowStage = document.getElementById('sceneWorkflowStage')

const sceneWorkflowData = {
  start: {
    label: 'START SCENE',
    title: 'Establish the situation.',
    text: 'Set the title, location, cast, mood, objective and anything immediately important before continuing the RP.'
  },
  play: {
    label: 'ROLEPLAY',
    title: 'The conversation continues normally.',
    text: 'Scene State remains available on Furina’s side while the current scene plays out in Clank.'
  },
  end: {
    label: 'END SCENE',
    title: 'Review what changed.',
    text: 'Preserve a recap, update open threads, add timeline consequences and optionally capture an ending snapshot.'
  }
}

sceneWorkflowSteps.forEach(button => {
  button.addEventListener('click', () => {
    const stage = button.dataset.sceneStage
    const data = sceneWorkflowData[stage]
    if (!data || !sceneWorkflowStage) return
    sceneWorkflowSteps.forEach(item =>
      item.classList.toggle('is-active', item === button)
    )
    sceneWorkflowStage.innerHTML = `<small>${data.label}</small><h3>${data.title}</h3><p>${data.text}</p>`
  })
})

const previouslyOverlayDemo = document.getElementById('previouslyOverlayDemo')

document.getElementById('showPreviouslyOn')?.addEventListener('click', () => {
  if (previouslyOverlayDemo) previouslyOverlayDemo.hidden = false
})

document.getElementById('closePreviouslyOn')?.addEventListener('click', () => {
  if (previouslyOverlayDemo) previouslyOverlayDemo.hidden = true
})

previouslyOverlayDemo
  ?.querySelector('.previously-overlay-demo__backdrop')
  ?.addEventListener('click', () => {
    previouslyOverlayDemo.hidden = true
  })

document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    previouslyOverlayDemo &&
    !previouslyOverlayDemo.hidden
  ) {
    previouslyOverlayDemo.hidden = true
  }
})

const timelineFilters = Array.from(
  document.querySelectorAll('[data-timeline-filter]')
)
const timelineEvents = Array.from(
  document.querySelectorAll('[data-timeline-status]')
)

timelineFilters.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.timelineFilter
    timelineFilters.forEach(item =>
      item.classList.toggle('is-active', item === button)
    )
    timelineEvents.forEach(event => {
      event.classList.toggle(
        'is-hidden',
        filter !== 'all' && event.dataset.timelineStatus !== filter
      )
    })
  })
})

const snapshotSceneValue = document.getElementById('snapshotSceneValue')
const snapshotMoodValue = document.getElementById('snapshotMoodValue')
const snapshotObjectiveValue = document.getElementById('snapshotObjectiveValue')
const snapshotSavedCard = document.getElementById('snapshotSavedCard')
const restoreSnapshotButton = document.getElementById('restoreSnapshotButton')
let savedSnapshot = null

document
  .getElementById('captureSnapshotButton')
  ?.addEventListener('click', () => {
    savedSnapshot = {
      scene: snapshotSceneValue?.textContent || '',
      mood: snapshotMoodValue?.textContent || '',
      objective: snapshotObjectiveValue?.textContent || ''
    }
    if (snapshotSavedCard) {
      snapshotSavedCard.classList.add('has-snapshot')
      snapshotSavedCard.innerHTML = `<span>${savedSnapshot.scene}</span><p>Mood: ${savedSnapshot.mood}<br>Objective: ${savedSnapshot.objective}</p>`
    }
    if (restoreSnapshotButton) restoreSnapshotButton.disabled = false
  })

document
  .getElementById('changeSnapshotStateButton')
  ?.addEventListener('click', () => {
    if (snapshotSceneValue)
      snapshotSceneValue.textContent = 'Alternate Station Scene'
    if (snapshotMoodValue) snapshotMoodValue.textContent = 'Hostile'
    if (snapshotObjectiveValue)
      snapshotObjectiveValue.textContent = 'Confront the stranger'
  })

restoreSnapshotButton?.addEventListener('click', () => {
  if (!savedSnapshot) return
  if (snapshotSceneValue) snapshotSceneValue.textContent = savedSnapshot.scene
  if (snapshotMoodValue) snapshotMoodValue.textContent = savedSnapshot.mood
  if (snapshotObjectiveValue)
    snapshotObjectiveValue.textContent = savedSnapshot.objective
})

const bookmarkToggles = Array.from(
  document.querySelectorAll('.bookmark-toggle')
)
const bookmarkCount = document.getElementById('bookmarkCount')

function updateBookmarkCount() {
  if (!bookmarkCount) return
  const count = bookmarkToggles.filter(button =>
    button.classList.contains('is-bookmarked')
  ).length
  bookmarkCount.textContent = `${count} ${count === 1 ? 'bookmark' : 'bookmarks'}`
}

bookmarkToggles.forEach(button => {
  button.addEventListener('click', () => {
    const active = button.classList.toggle('is-bookmarked')
    button.textContent = active ? '★' : '☆'
    updateBookmarkCount()
  })
})

updateBookmarkCount()

const storyBibleCheckboxes = Array.from(
  document.querySelectorAll('[data-story-bible-component]')
)
const storyBibleSummary = document.getElementById('storyBibleSummary')
const storyBibleResult = document.getElementById('storyBibleResult')

function selectedStoryBibleComponents() {
  return storyBibleCheckboxes
    .filter(input => input.checked)
    .map(input => input.dataset.storyBibleComponent)
}

function updateStoryBibleSummary() {
  if (!storyBibleSummary) return
  const count = selectedStoryBibleComponents().length
  storyBibleSummary.textContent = `${count} ${count === 1 ? 'component' : 'components'} included`
}

storyBibleCheckboxes.forEach(input =>
  input.addEventListener('change', updateStoryBibleSummary)
)

document
  .getElementById('buildStoryBibleButton')
  ?.addEventListener('click', () => {
    if (!storyBibleResult) return
    const selected = selectedStoryBibleComponents()
    storyBibleResult.textContent = selected.length
      ? `Example package: ${selected.join(' · ')}.`
      : 'Nothing is selected, so the example package would contain no story components.'
  })

updateStoryBibleSummary()

/* ============================================================
   INTERFACES GUIDE
============================================================ */

const vnDemoLines = [
  '“You heard that too, right?”',
  'Mira does not answer. Her eyes stay fixed on the far platform.',
  '“Then we are not alone.”'
]
let vnDemoIndex = 0
const vnDemoLine = document.getElementById('vnDemoLine')

document.getElementById('vnDemoNext')?.addEventListener('click', () => {
  vnDemoIndex = (vnDemoIndex + 1) % vnDemoLines.length
  if (vnDemoLine) vnDemoLine.textContent = vnDemoLines[vnDemoIndex]
})

const castData = {
  emi: [
    'E',
    'Emi',
    "Uses Emi's captured portrait when a beat is attributed to Emi."
  ],
  raven: ['R', 'Raven', "Uses Raven's portrait for Raven speaker beats."],
  maya: [
    'M',
    'Maya',
    "Uses Maya's portrait when Maya is the resolved speaker."
  ],
  narrator: [
    '◇',
    'Narrator',
    'Narration can fall back to shared scene or group artwork instead of a speaker portrait.'
  ]
}

const castButtons = Array.from(document.querySelectorAll('[data-cast]'))
castButtons.forEach(button => {
  button.addEventListener('click', () => {
    const data = castData[button.dataset.cast]
    if (!data) return
    castButtons.forEach(item =>
      item.classList.toggle('is-active', item === button)
    )
    const portrait = document.getElementById('castPortrait')
    const name = document.getElementById('castName')
    const description = document.getElementById('castDescription')
    if (portrait) portrait.textContent = data[0]
    if (name) name.textContent = data[1]
    if (description) description.textContent = data[2]
  })
})

/* ============================================================
   RESPONSE STYLE LIBRARY
============================================================ */

const responseStyleGrid = document.getElementById('responseStyleGrid')
const responseStyleSearch = document.getElementById('responseStyleSearch')
const responseStyleFilters = Array.from(
  document.querySelectorAll('[data-style-filter]')
)
const responseStyleCount = document.getElementById('responseStyleCount')
const responseStyleEmpty = document.getElementById('responseStyleEmpty')
let responseStyleFilter = 'all'

function renderResponseStyles() {
  if (!responseStyleGrid || !window.FurinaSiteData?.responseStyles) return
  const query = String(responseStyleSearch?.value || '')
    .trim()
    .toLocaleLowerCase()
  const styles = window.FurinaSiteData.responseStyles.filter(style => {
    const categoryMatch =
      responseStyleFilter === 'all' || style.category === responseStyleFilter
    const haystack =
      `${style.name} ${style.description} ${style.category}`.toLocaleLowerCase()
    return categoryMatch && (!query || haystack.includes(query))
  })

  responseStyleGrid.innerHTML = styles
    .map(
      style => `
    <article class="response-style-card">
      <span class="response-style-card__icon">${style.icon}</span>
      <small>${style.category}</small>
      <strong>${style.name}</strong>
      <p>${style.description}</p>
    </article>
  `
    )
    .join('')

  if (responseStyleCount)
    responseStyleCount.textContent = `${styles.length} ${styles.length === 1 ? 'style' : 'styles'}`
  if (responseStyleEmpty) responseStyleEmpty.hidden = styles.length !== 0
}

responseStyleSearch?.addEventListener('input', renderResponseStyles)
responseStyleFilters.forEach(button => {
  button.addEventListener('click', () => {
    responseStyleFilter = button.dataset.styleFilter
    responseStyleFilters.forEach(item =>
      item.classList.toggle('is-active', item === button)
    )
    renderResponseStyles()
  })
})
renderResponseStyles()

/* ============================================================
   PROFILE ATELIER GUIDE
============================================================ */

const profilePreviewStage = document.querySelector(
  '.profile-preview-demo__stage'
)
const profileRadiusSlider = document.getElementById('profileRadiusSlider')
const profileCardSlider = document.getElementById('profileCardSlider')
const profileSidebarSlider = document.getElementById('profileSidebarSlider')

function bindProfileRange(slider, valueId, cssProperty, suffix) {
  slider?.addEventListener('input', () => {
    const value = slider.value
    const label = document.getElementById(valueId)
    if (label) label.textContent = `${value}${suffix}`
    profilePreviewStage?.style.setProperty(cssProperty, `${value}${suffix}`)
  })
}

bindProfileRange(
  profileRadiusSlider,
  'profileRadiusValue',
  '--profile-radius',
  'px'
)
bindProfileRange(
  profileCardSlider,
  'profileCardValue',
  '--profile-card-size',
  'px'
)
bindProfileRange(
  profileSidebarSlider,
  'profileSidebarValue',
  '--profile-sidebar',
  'px'
)

const profileAccentButtons = Array.from(
  document.querySelectorAll('[data-profile-accent]')
)
profileAccentButtons.forEach(button => {
  button.addEventListener('click', () => {
    profileAccentButtons.forEach(item =>
      item.classList.toggle('is-active', item === button)
    )
    profilePreviewStage?.style.setProperty(
      '--profile-accent',
      button.dataset.profileAccent
    )
  })
})

document.querySelectorAll('#profileEffectsDemo button').forEach(button => {
  button.addEventListener('click', () => {
    const enabled = button.classList.toggle('is-enabled')
    const icon = button.querySelector(':scope > span')
    if (icon) icon.textContent = enabled ? '✓' : '+'
  })
})

const profileThemeButtons = Array.from(
  document.querySelectorAll('[data-profile-theme]')
)
profileThemeButtons.forEach(button => {
  button.addEventListener('click', () => {
    profileThemeButtons.forEach(item =>
      item.classList.toggle('is-active', item === button)
    )
    const name = document.getElementById('profileThemeName')
    if (name)
      name.textContent = button.querySelector('strong')?.textContent || 'Theme'
  })
})

/* ============================================================
   SHARING GUIDE
============================================================ */

const setupPartCheckboxes = Array.from(
  document.querySelectorAll('[data-setup-part]')
)
const setupBuilderCount = document.getElementById('setupBuilderCount')
const setupBuilderSummary = document.getElementById('setupBuilderSummary')
const setupPreviewStatus = document.getElementById('setupPreviewStatus')

function updateSetupBuilder() {
  const selected = setupPartCheckboxes
    .filter(input => input.checked)
    .map(input => input.dataset.setupPart)
  if (setupBuilderCount)
    setupBuilderCount.textContent = `${selected.length} ${selected.length === 1 ? 'component' : 'components'} selected`
  if (setupBuilderSummary)
    setupBuilderSummary.textContent = selected.length
      ? selected.join(' · ')
      : 'Nothing selected'
  return selected
}

setupPartCheckboxes.forEach(input =>
  input.addEventListener('change', updateSetupBuilder)
)

document.getElementById('setupPreviewButton')?.addEventListener('click', () => {
  const selected = updateSetupBuilder()
  if (!setupPreviewStatus) return
  setupPreviewStatus.textContent = selected.length
    ? `Previewing example: ${selected.join(', ')}. A real Furina import can still be reverted before you keep it.`
    : 'Select at least one available component to preview.'
})

updateSetupBuilder()

const bibleModeButtons = Array.from(
  document.querySelectorAll('[data-bible-mode]')
)
bibleModeButtons.forEach(button => {
  button.addEventListener('click', () => {
    bibleModeButtons.forEach(item =>
      item.classList.toggle('is-active', item === button)
    )
    const description = document.getElementById('bibleModeDescription')
    if (!description) return
    description.innerHTML =
      button.dataset.bibleMode === 'replace'
        ? '<strong>Replace:</strong> use the imported Story Bible state instead of preserving the current version of the same Furina story data.'
        : '<strong>Merge:</strong> keep current data and combine incoming items where possible.'
  })
})

/* ============================================================
   TROUBLESHOOTING GUIDE
============================================================ */

const troubleData = {
  missing: {
    title: 'Furina is missing',
    steps: [
      'Confirm the extension is enabled in your browser.',
      'Confirm you are on a supported Clank chat route.',
      'Reload the Clank tab.',
      'If you just reloaded or updated the extension, reload the tab again so the page gets the new extension context.'
    ]
  },
  stuck: {
    title: 'Panel or buttons are stuck',
    steps: [
      'Close and reopen the Furina panel.',
      'Reload the Clank page if the panel state still looks stale.',
      'If the extension was updated or reloaded, refresh the tab afterward.',
      'If one conversation alone looks wrong, check conversation-specific scope before resetting anything.'
    ]
  },
  background: {
    title: 'Background is missing or behaving strangely',
    steps: [
      'Verify the image/video URL is a direct browser-accessible media source.',
      'Check background darkness and blur so the source is not simply hidden.',
      'Test the source in a normal browser tab.',
      'For a live wallpaper loop hitch, test a more seamless source clip.'
    ]
  },
  audio: {
    title: 'Music is not playing',
    steps: [
      'Interact with the page once so browser autoplay policy can allow media.',
      'Check Furina play/pause and volume.',
      'Confirm whether the source is direct audio, SoundCloud or YouTube.',
      'Test that the external source itself is still available.'
    ]
  },
  interface: {
    title: 'Visual Novel / Phantom issue',
    steps: [
      'Exit to the normal Clank conversation and confirm the source chat looks correct.',
      'Reopen or refresh the alternate interface so it can rebuild its local view.',
      'For missing portraits, verify the speaker/scene data exists for Furina to capture.',
      'If sending fails, test Clank’s native composer first.'
    ]
  }
}

const troubleButtons = Array.from(document.querySelectorAll('[data-trouble]'))
const troubleAnswer = document.getElementById('troubleAnswer')

troubleButtons.forEach(button => {
  button.addEventListener('click', () => {
    troubleButtons.forEach(item =>
      item.classList.toggle('is-active', item === button)
    )
    const data = troubleData[button.dataset.trouble]
    if (!data || !troubleAnswer) return
    troubleAnswer.innerHTML = `<small>START HERE</small><strong>${data.title}</strong><ol>${data.steps.map(step => `<li>${step}</li>`).join('')}</ol>`
  })
})

/* ============================================================
   GUIDE LIBRARY
============================================================ */

const guideGrid = document.getElementById('guideGrid')
const guideSearch = document.getElementById('guideSearch')
const guideFilters = Array.from(
  document.querySelectorAll('[data-guide-filter]')
)
const guideCount = document.getElementById('guideCount')
const guideEmpty = document.getElementById('guideEmpty')
let guideFilter = 'all'

function renderGuideLibrary() {
  if (!guideGrid || !window.FurinaSiteData?.guides) return
  const query = String(guideSearch?.value || '')
    .trim()
    .toLocaleLowerCase()
  const guides = window.FurinaSiteData.guides.filter(guide => {
    const categoryMatch =
      guideFilter === 'all' || guide.category === guideFilter
    const haystack =
      `${guide.title} ${guide.description} ${guide.category} ${(guide.tags || []).join(' ')}`.toLocaleLowerCase()
    return categoryMatch && (!query || haystack.includes(query))
  })

  guideGrid.innerHTML = guides
    .map(
      guide => `
    <a class="guide-card" href="${guide.href}">
      <div class="guide-card__top"><span class="guide-card__icon">${guide.icon}</span><span class="guide-card__category">${guide.category}</span></div>
      <h3>${guide.title}</h3>
      <p>${guide.description}</p>
      <span class="guide-card__link">Open guide <span>→</span></span>
    </a>
  `
    )
    .join('')

  if (guideCount)
    guideCount.textContent = `${guides.length} ${guides.length === 1 ? 'guide' : 'guides'}`
  if (guideEmpty) guideEmpty.hidden = guides.length !== 0
}

guideSearch?.addEventListener('input', renderGuideLibrary)

document.addEventListener('keydown', event => {
  if (!guideSearch) return
  const target = event.target
  const typing =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target?.isContentEditable
  const shortcut =
    event.key === '/' ||
    ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 'k')
  if (!typing && shortcut) {
    event.preventDefault()
    guideSearch.focus()
    guideSearch.select()
  }
})
guideFilters.forEach(button => {
  button.addEventListener('click', () => {
    guideFilter = button.dataset.guideFilter
    guideFilters.forEach(item =>
      item.classList.toggle('is-active', item === button)
    )
    renderGuideLibrary()
  })
})

renderGuideLibrary()

/* ============================================================
   IMMERSION GUIDE
============================================================ */

/* Atmosphere ------------------------------------------------ */
const atmosphereStage = document.getElementById('atmosphereStage')
const atmospherePresetButtons = Array.from(
  document.querySelectorAll('[data-atmosphere-preset]')
)
const atmospherePreviewName = document.getElementById('atmospherePreviewName')
const atmosphereIntensity = document.getElementById('atmosphereIntensity')
const atmosphereIntensityValue = document.getElementById(
  'atmosphereIntensityValue'
)
const atmosphereSpeed = document.getElementById('atmosphereSpeed')
const atmosphereSpeedValue = document.getElementById('atmosphereSpeedValue')

atmospherePresetButtons.forEach(button => {
  button.addEventListener('click', () => {
    atmospherePresetButtons.forEach(item =>
      item.classList.toggle('is-active', item === button)
    )
    if (atmosphereStage)
      atmosphereStage.dataset.atmosphere = button.dataset.atmospherePreset
    if (atmospherePreviewName)
      atmospherePreviewName.textContent =
        button.dataset.atmosphereName || button.textContent.trim()
  })
})

atmosphereIntensity?.addEventListener('input', () => {
  const value = Number(atmosphereIntensity.value)
  atmosphereStage?.style.setProperty(
    '--atmosphere-opacity',
    String(value / 100)
  )
  if (atmosphereIntensityValue)
    atmosphereIntensityValue.textContent = `${value}%`
})

atmosphereSpeed?.addEventListener('input', () => {
  const value = Number(atmosphereSpeed.value) / 100
  atmosphereStage?.style.setProperty('--atmosphere-speed', String(value))
  if (atmosphereSpeedValue)
    atmosphereSpeedValue.textContent = `${value.toFixed(2).replace(/0$/, '')}×`
})

/* Music ----------------------------------------------------- */
const musicSourceButtons = Array.from(
  document.querySelectorAll('[data-music-source]')
)
const musicUrlLabel = document.getElementById('musicUrlLabel')
const musicUrlExample = document.getElementById('musicUrlExample')
const musicTrackName = document.getElementById('musicTrackName')
const musicSourceNote = document.getElementById('musicSourceNote')
const musicPlayButton = document.getElementById('musicPlayButton')
const musicPlayIcon = document.getElementById('musicPlayIcon')
const musicPlayerCard = musicPlayButton?.closest('.music-player-card')
const musicVolume = document.getElementById('musicVolume')
const musicVolumeValue = document.getElementById('musicVolumeValue')
let musicDemoPlaying = false

const musicSourceData = {
  direct: {
    label: 'DIRECT .MP3 / .OGG',
    url: 'https://example.com/rainy-cafe.mp3',
    name: 'Rainy Café',
    note: 'Furina player controls'
  },
  soundcloud: {
    label: 'SOUNDCLOUD URL',
    url: 'https://soundcloud.com/example/character-theme',
    name: 'Character Theme',
    note: 'SoundCloud player'
  },
  youtube: {
    label: 'YOUTUBE URL',
    url: 'https://www.youtube.com/watch?v=example',
    name: 'Scene Soundtrack',
    note: 'YouTube player'
  }
}

function setMusicDemoSource(source) {
  const data = musicSourceData[source]
  if (!data) return
  musicSourceButtons.forEach(button =>
    button.classList.toggle('is-active', button.dataset.musicSource === source)
  )
  if (musicUrlLabel) musicUrlLabel.textContent = data.label
  if (musicUrlExample) musicUrlExample.textContent = data.url
  if (musicTrackName) musicTrackName.textContent = data.name
  if (musicSourceNote) musicSourceNote.textContent = data.note
  musicDemoPlaying = false
  musicPlayerCard?.classList.remove('is-playing')
  if (musicPlayIcon) musicPlayIcon.textContent = '▶'
}

musicSourceButtons.forEach(button =>
  button.addEventListener('click', () =>
    setMusicDemoSource(button.dataset.musicSource)
  )
)

musicPlayButton?.addEventListener('click', () => {
  musicDemoPlaying = !musicDemoPlaying
  musicPlayerCard?.classList.toggle('is-playing', musicDemoPlaying)
  if (musicPlayIcon) musicPlayIcon.textContent = musicDemoPlaying ? 'Ⅱ' : '▶'
})

musicVolume?.addEventListener('input', () => {
  if (musicVolumeValue) musicVolumeValue.textContent = `${musicVolume.value}%`
})

/* Stickers -------------------------------------------------- */
const stickerStage = document.getElementById('stickerStage')
const stickerDemoObject = document.getElementById('stickerDemoObject')
const stickerLockButton = document.getElementById('stickerLockButton')
const stickerDuplicateButton = document.getElementById('stickerDuplicateButton')
const stickerOpacity = document.getElementById('stickerOpacity')
const stickerOpacityValue = document.getElementById('stickerOpacityValue')
const stickerRotation = document.getElementById('stickerRotation')
const stickerRotationValue = document.getElementById('stickerRotationValue')
const stickerPositionButtons = Array.from(
  document.querySelectorAll('[data-sticker-position]')
)
let stickerLocked = false
let stickerDrag = null

function clampStickerPosition(left, top) {
  if (!stickerStage || !stickerDemoObject) return {left, top}
  const stage = stickerStage.getBoundingClientRect()
  const sticker = stickerDemoObject.getBoundingClientRect()
  return {
    left: Math.max(0, Math.min(left, stage.width - sticker.width)),
    top: Math.max(0, Math.min(top, stage.height - sticker.height))
  }
}

stickerDemoObject?.addEventListener('pointerdown', event => {
  if (stickerLocked || !stickerStage || !stickerDemoObject) return
  const stage = stickerStage.getBoundingClientRect()
  const item = stickerDemoObject.getBoundingClientRect()
  stickerDrag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - item.left,
    offsetY: event.clientY - item.top,
    stageLeft: stage.left,
    stageTop: stage.top
  }
  stickerDemoObject.setPointerCapture?.(event.pointerId)
})

stickerDemoObject?.addEventListener('pointermove', event => {
  if (
    !stickerDrag ||
    stickerDrag.pointerId !== event.pointerId ||
    !stickerDemoObject
  )
    return
  const next = clampStickerPosition(
    event.clientX - stickerDrag.stageLeft - stickerDrag.offsetX,
    event.clientY - stickerDrag.stageTop - stickerDrag.offsetY
  )
  stickerDemoObject.style.left = `${next.left}px`
  stickerDemoObject.style.top = `${next.top}px`
})

function endStickerDrag(event) {
  if (!stickerDrag || stickerDrag.pointerId !== event.pointerId) return
  stickerDrag = null
}

stickerDemoObject?.addEventListener('pointerup', endStickerDrag)
stickerDemoObject?.addEventListener('pointercancel', endStickerDrag)

stickerLockButton?.addEventListener('click', () => {
  stickerLocked = !stickerLocked
  stickerDemoObject?.classList.toggle('is-locked', stickerLocked)
  stickerLockButton.textContent = stickerLocked ? '🔒 Locked' : '🔓 Unlocked'
})

stickerDuplicateButton?.addEventListener('click', () => {
  if (!stickerStage || !stickerDemoObject) return
  const clone = stickerDemoObject.cloneNode(true)
  clone.removeAttribute('id')
  clone.removeAttribute('aria-label')
  clone.querySelector('small')?.remove()
  clone.style.pointerEvents = 'none'
  clone.style.left = `${Math.min(stickerStage.clientWidth - 74, stickerDemoObject.offsetLeft + 48)}px`
  clone.style.top = `${Math.min(stickerStage.clientHeight - 74, stickerDemoObject.offsetTop + 54)}px`
  clone.style.transform = 'rotate(14deg) scale(.72)'
  clone.style.opacity = '.72'
  stickerStage.appendChild(clone)
  window.setTimeout(() => clone.remove(), 1800)
})

stickerOpacity?.addEventListener('input', () => {
  const value = Number(stickerOpacity.value)
  if (stickerDemoObject) stickerDemoObject.style.opacity = String(value / 100)
  if (stickerOpacityValue) stickerOpacityValue.textContent = `${value}%`
})

stickerRotation?.addEventListener('input', () => {
  const value = Number(stickerRotation.value)
  stickerDemoObject?.style.setProperty('--sticker-rotation', `${value}deg`)
  if (stickerRotationValue) stickerRotationValue.textContent = `${value}°`
})

stickerPositionButtons.forEach(button => {
  button.addEventListener('click', () => {
    stickerPositionButtons.forEach(item =>
      item.classList.toggle('is-active', item === button)
    )
  })
})

/* Reader / Focus ------------------------------------------- */
const readerModeToggle = document.getElementById('readerModeToggle')
const readerOptions = Array.from(document.querySelectorAll('.reader-option'))
const readerPreview = document.getElementById('readerPreview')
const focusModeDemoButton = document.getElementById('focusModeDemoButton')
const readerFocusCard = document.getElementById('readerFocusCard')
const exitFocusModeDemo = document.getElementById('exitFocusModeDemo')

function updateReaderDemo() {
  if (!readerPreview) return
  const enabled = Boolean(readerModeToggle?.checked)
  readerPreview.classList.toggle('is-reader', enabled)
  readerOptions.forEach(option => {
    readerPreview.classList.toggle(
      option.dataset.readerClass,
      enabled && option.checked
    )
  })
}

readerModeToggle?.addEventListener('change', updateReaderDemo)
readerOptions.forEach(option =>
  option.addEventListener('change', updateReaderDemo)
)

function setReaderFocusDemo(visible) {
  if (readerFocusCard) readerFocusCard.hidden = !visible
}

focusModeDemoButton?.addEventListener('click', () => setReaderFocusDemo(true))
exitFocusModeDemo?.addEventListener('click', () => setReaderFocusDemo(false))

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && readerFocusCard && !readerFocusCard.hidden)
    setReaderFocusDemo(false)
})

updateReaderDemo()
