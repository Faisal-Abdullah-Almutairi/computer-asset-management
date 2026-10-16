
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('AssetFlow application', () => {
  it('displays the dashboard overview', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Computer Assets Overview' })
    ).toBeInTheDocument()
  })

  it('navigates to the All Assets page', () => {
    render(<App />)

    fireEvent.click(
      screen.getByRole('button', { name: /All Assets/ })
    )

    expect(
      screen.getByRole('heading', { name: 'All Computer Assets' })
    ).toBeInTheDocument()
  })

  it('opens the form to add a computer', () => {
    render(<App />)

    fireEvent.click(
      screen.getByRole('button', { name: /All Assets/ })
    )

    fireEvent.click(
      screen.getByRole('button', { name: /Add Computer/ })
    )

    expect(
      screen.getByRole('heading', { name: 'Add New Computer' })
    ).toBeInTheDocument()
  })
})
