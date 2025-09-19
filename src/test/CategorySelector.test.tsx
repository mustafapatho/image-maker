import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import CategorySelector from '../../components/CategorySelector'
import { LocalizationProvider } from '../../contexts/LocalizationContext'
import { CATEGORIES } from '../../constants'

const mockOnSelect = vi.fn()

const renderCategorySelector = () => {
  return render(
    <LocalizationProvider>
      <CategorySelector categories={CATEGORIES} onSelect={mockOnSelect} />
    </LocalizationProvider>
  )
}

describe('CategorySelector Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders all categories', () => {
    renderCategorySelector()
    
    expect(screen.getByText(/viral content|المحتوى الفيروسي/i)).toBeInTheDocument()
    expect(screen.getByText(/restaurant|مطعم|cafe|مقهى/i)).toBeInTheDocument()
    expect(screen.getByText(/fashion|تسويق المنتجات/i)).toBeInTheDocument()
  })

  test('calls onSelect when category is clicked', () => {
    renderCategorySelector()
    
    const categoryButton = screen.getByText(/restaurant|مطعم|cafe|مقهى/i).closest('button')
    fireEvent.click(categoryButton!)
    expect(mockOnSelect).toHaveBeenCalled()
  })

  test('displays category descriptions', () => {
    renderCategorySelector()
    
    expect(screen.getByText(/upload menu|ارفع صور القائمة/i)).toBeInTheDocument()
  })

  test('has proper responsive grid layout', () => {
    renderCategorySelector()
    
    const gridContainer = document.querySelector('.grid')
    expect(gridContainer).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4')
  })
})