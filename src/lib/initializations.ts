import { INITIAL_FOCUS_ATTR, SECTION_DIRECTION_ATTR, SECTION_ID_ATTR } from '../constants'
import { all } from './dom'
import { handleFocusElement } from './nagivation'
import { ManagedDirectionalSection } from './sections'
import { SectionDirections } from './types'

export function focusInitialElement() {
  const $initialFocus = document.querySelector(`[${INITIAL_FOCUS_ATTR}]`) as HTMLElement

  if (!$initialFocus) return

  handleFocusElement($initialFocus)
}

export function initManagedDirectionalSection() {
  const $sections = all(`[${SECTION_ID_ATTR}]`)

  const sections = Array.from($sections).reduce((sectionsObject, node) => {
    const section = node as HTMLElement

    const sectionId = section.getAttribute(SECTION_ID_ATTR)

    const direction = section.getAttribute(SECTION_DIRECTION_ATTR) as SectionDirections

    if (!sectionId || !direction) return sectionsObject

    return {
      ...sectionsObject,
      [sectionId]: new ManagedDirectionalSection(sectionId, direction),
    }
  }, {} as Record<string, ManagedDirectionalSection>)

  window['__dn_sections__'] = sections
}
