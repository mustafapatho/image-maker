import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Auth from '../../components/Auth'
import { LocalizationProvider } from '../../contexts/LocalizationContext'

// Mock Supabase service
vi.mock('../../services/supabase', () => ({
  signInWithEmail: vi.fn(),
  signUpWithEmail: vi.fn(),
  signInWithGoogle: vi.fn(),
}))

const renderAuth = () => {
  return render(
    <LocalizationProvider>
      <Auth />
    </LocalizationProvider>
  )
}

describe('Auth Component', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    const { signInWithEmail, signUpWithEmail, signInWithGoogle } = await import('../../services/supabase')
    vi.mocked(signInWithEmail).mockClear()
    vi.mocked(signUpWithEmail).mockClear()
    vi.mocked(signInWithGoogle).mockClear()
  })

  test('renders sign in form by default', () => {
    renderAuth()
    expect(screen.getByRole('button', { name: /^(sign in|تسجيل الدخول)$/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email|البريد الإلكتروني/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password|كلمة المرور/i)).toBeInTheDocument()
  })

  test('switches to sign up form', () => {
    renderAuth()
    fireEvent.click(screen.getByText(/need an account|تحتاج حساب/i))
    expect(screen.getByRole('button', { name: /^(sign up|إنشاء حساب)$/i })).toBeInTheDocument()
  })

  test('validates required fields', async () => {
    const { signInWithEmail } = await import('../../services/supabase')
    renderAuth()
    const submitButton = screen.getByRole('button', { name: /^(sign in|تسجيل الدخول)$/i })
    fireEvent.click(submitButton)
    
    // Form should not submit without email/password
    expect(signInWithEmail).not.toHaveBeenCalled()
  })

  test('calls signInWithEmail on form submission', async () => {
    const { signInWithEmail } = await import('../../services/supabase')
    vi.mocked(signInWithEmail).mockResolvedValue({
      data: { user: { id: '1', email: 'test@test.com' } },
      error: null
    })

    renderAuth()
    
    fireEvent.change(screen.getByLabelText(/email|البريد الإلكتروني/i), {
      target: { value: 'test@test.com' }
    })
    fireEvent.change(screen.getByLabelText(/password|كلمة المرور/i), {
      target: { value: 'password123' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /^(sign in|تسجيل الدخول)$/i }))
    
    await waitFor(() => {
      expect(signInWithEmail).toHaveBeenCalledWith('test@test.com', 'password123')
    })
  })

  test('handles authentication errors', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const { signInWithEmail } = await import('../../services/supabase')
    vi.mocked(signInWithEmail).mockResolvedValue({
      data: null,
      error: { message: 'Invalid credentials' }
    })

    renderAuth()
    
    fireEvent.change(screen.getByLabelText(/email|البريد الإلكتروني/i), {
      target: { value: 'test@test.com' }
    })
    fireEvent.change(screen.getByLabelText(/password|كلمة المرور/i), {
      target: { value: 'wrongpassword' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /^(sign in|تسجيل الدخول)$/i }))
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Invalid credentials')
    })
    
    alertSpy.mockRestore()
  })

  test('language switcher works', () => {
    renderAuth()
    
    fireEvent.click(screen.getByText('EN'))
    expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument()
    
    fireEvent.click(screen.getByText('AR'))
    expect(screen.getByRole('button', { name: /^تسجيل الدخول$/i })).toBeInTheDocument()
  })
})