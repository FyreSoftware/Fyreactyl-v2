import { useTheme } from 'next-themes'

import { ThemeSwitcher } from '@/components/elements'

const Header = ({ ...props }) => {
  const { theme } = useTheme()

  return (
    <header {...props}>
      <div className='absolute z-30 flex items-center justify-center w-full py-4 mx-auto lg:justify-end lg:py-8 lg:px-10'>
        <ThemeSwitcher iconSize={5} asToggle={true} />
      </div>
    </header>
  )
}

export default Header
