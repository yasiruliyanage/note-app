import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { Navbar } from "./Navbar"
import { useNavigate } from "react-router"
import SearchBar from "../SearchBar/SearchBar"

// Mock the dependencies
vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}))

vi.mock("../SearchBar/SearchBar", () => ({
  default: vi.fn(({ value, onChange, handleSearch, onClearSearch }) => (
    <div data-testid="search-bar">
      <input data-testid="search-input" value={value} onChange={onChange} />
      <button data-testid="search-button" onClick={handleSearch}>
        Search
      </button>
      <button data-testid="clear-button" onClick={onClearSearch}>
        Clear
      </button>
    </div>
  )),
}))

vi.mock("../Cards/ProfileInfo", () => ({
  default: vi.fn(({ onLogout }) => (
    <div data-testid="profile-info">
      <button data-testid="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )),
}))

describe("Navbar Component", () => {
  let mockNavigate

  beforeEach(() => {
    mockNavigate = vi.fn()
    useNavigate.mockReturnValue(mockNavigate)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("renders correctly with all elements", () => {
    render(<Navbar />)

    // Check if the logo is rendered
    expect(screen.getByTestId("textLogo")).toBeDefined()
    expect(screen.getByTestId("textLogo").textContent).toBe(" Notes ")

    // Check if SearchBar is rendered
    expect(screen.getByTestId("search-bar")).toBeDefined()

    // Check if ProfileInfo is rendered
    expect(screen.getByTestId("profile-info")).toBeDefined()
  })

  it("handles search query changes", () => {
    render(<Navbar />)

    const searchInput = screen.getByTestId("search-input")

    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: "test query" } })

    // Check if SearchBar was called with the updated value
    expect(SearchBar).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "test query",
      }),
      expect.anything(),
    )
  })

  it("clears search query when clear button is clicked", () => {
    render(<Navbar />)

    // First set a search query
    const searchInput = screen.getByTestId("search-input")
    fireEvent.change(searchInput, { target: { value: "test query" } })

    // Then clear it
    const clearButton = screen.getByTestId("clear-button")
    fireEvent.click(clearButton)

    // Check if SearchBar was called with empty value
    expect(SearchBar).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "",
      }),
      expect.anything(),
    )
  })

  it("navigates to login page when logout is clicked", () => {
    render(<Navbar />)

    const logoutButton = screen.getByTestId("logout-button")
    fireEvent.click(logoutButton)

    // Check if navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/login")
  })
})

