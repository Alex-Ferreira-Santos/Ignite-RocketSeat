import { render, screen} from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
  return{
    useRouter(){
      return{
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink component', () => {
    
  it('should renders correctly',() => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        <a href="">Home</a>
      </ActiveLink>
    )
    
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('adds active class if the lik as currently active',() => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        <a href="">Home</a>
      </ActiveLink>
    )
    
    expect(screen.getByText('Home')).toHaveClass('active')
  })
})
