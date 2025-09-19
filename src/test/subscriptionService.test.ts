import { vi } from 'vitest'
import {
  SUBSCRIPTION_PLANS,
  getUserSubscription,
  setUserSubscription,
  isSubscriptionActive,
  getRemainingImages,
  useImage
} from '../../services/subscriptionService'

describe('Subscription Service', () => {
  const mockStorage = new Map()
  
  beforeEach(() => {
    mockStorage.clear()
    vi.mocked(localStorage.getItem).mockImplementation((key) => mockStorage.get(key) || null)
    vi.mocked(localStorage.setItem).mockImplementation((key, value) => {
      mockStorage.set(key, value)
    })
    vi.mocked(localStorage.removeItem).mockImplementation((key) => {
      mockStorage.delete(key)
    })
    vi.mocked(localStorage.clear).mockImplementation(() => {
      mockStorage.clear()
    })
    vi.clearAllMocks()
  })

  test('has correct subscription plans', () => {
    expect(SUBSCRIPTION_PLANS).toHaveLength(3)
    expect(SUBSCRIPTION_PLANS[0]).toEqual({
      id: 'basic',
      name: 'Basic Plan',
      price: 25000,
      imagesPerMonth: 50,
      currency: 'IQD'
    })
  })

  test('getUserSubscription returns null when no subscription', () => {
    expect(getUserSubscription()).toBeNull()
  })

  test('setUserSubscription stores subscription', () => {
    const subscription = {
      planId: 'basic',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      imagesUsed: 0,
      status: 'active' as const
    }
    
    setUserSubscription(subscription)
    expect(getUserSubscription()).toEqual(subscription)
  })

  test('isSubscriptionActive returns false for no subscription', () => {
    expect(isSubscriptionActive()).toBe(false)
  })

  test('isSubscriptionActive returns true for active subscription', () => {
    const futureDate = new Date()
    futureDate.setMonth(futureDate.getMonth() + 1)
    
    setUserSubscription({
      planId: 'basic',
      startDate: new Date().toISOString(),
      endDate: futureDate.toISOString(),
      imagesUsed: 0,
      status: 'active'
    })
    
    expect(isSubscriptionActive()).toBe(true)
  })

  test('isSubscriptionActive returns false for expired subscription', () => {
    const pastDate = new Date()
    pastDate.setMonth(pastDate.getMonth() - 1)
    
    setUserSubscription({
      planId: 'basic',
      startDate: pastDate.toISOString(),
      endDate: pastDate.toISOString(),
      imagesUsed: 0,
      status: 'active'
    })
    
    expect(isSubscriptionActive()).toBe(false)
  })

  test('getRemainingImages calculates correctly', () => {
    const futureDate = new Date()
    futureDate.setMonth(futureDate.getMonth() + 1)
    
    setUserSubscription({
      planId: 'basic',
      startDate: new Date().toISOString(),
      endDate: futureDate.toISOString(),
      imagesUsed: 10,
      status: 'active'
    })
    
    expect(getRemainingImages()).toBe(40) // 50 - 10
  })

  test('useImage decrements remaining images', () => {
    const futureDate = new Date()
    futureDate.setMonth(futureDate.getMonth() + 1)
    
    setUserSubscription({
      planId: 'basic',
      startDate: new Date().toISOString(),
      endDate: futureDate.toISOString(),
      imagesUsed: 0,
      status: 'active'
    })
    
    expect(useImage()).toBe(true)
    expect(getRemainingImages()).toBe(49)
  })

  test('useImage returns false when no images remaining', () => {
    const futureDate = new Date()
    futureDate.setMonth(futureDate.getMonth() + 1)
    
    setUserSubscription({
      planId: 'basic',
      startDate: new Date().toISOString(),
      endDate: futureDate.toISOString(),
      imagesUsed: 50,
      status: 'active'
    })
    
    expect(useImage()).toBe(false)
    expect(getRemainingImages()).toBe(0)
  })
})