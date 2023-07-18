import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Profile', to: '/profile' },
  { name: 'Setting', to: '/setting' },
  { name: 'About', to: '/about' },
]

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [checkedLogin, setCheckedLogin] = useState(false)
  const location = useLocation();
    const handleLogOutClick = () => {
      Cookies.remove('jwt')
      setCheckedLogin(false)
    }
    
  return (
    <div className="">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex md:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 md:flex items-center hidden">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="images/registration_icon.svg"
                alt=""
              />
              <p className='text-lg font-semibold leading-6 text-gray-800'>User Authentication </p>
            </Link>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6 text-black" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:flex md:gap-x-12">
            {navigation.map((item) => (
              <NavLink key={item.name} to={item.to} className={`text-md font-semibold leading-6 ${
                location.pathname === item.to ? 'text-[#c57743]' : 'text-gray-800'
              }`}>
                {item.name}
              </NavLink>
            ))}
          </div>
          {checkedLogin ?
          <div className="hidden md:flex md:flex-1 md:justify-end">
            <Link to="/login" className="text-md font-semibold leading-6 text-gray-800">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          :
          <div className="hidden md:flex md:flex-1 md:justify-end">
            <Link to="/login" onClick={handleLogOutClick} className="text-md font-semibold leading-6 text-gray-800">
              Log out <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          }
        </nav>
        <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 flex item-center">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="images/registration_icon.svg"
                  alt=""
                />
                <p className='text-lg font-semibold text-slate-50 ps-2'>User Authentication </p>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                {checkedLogin ?
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    Log in
                  </Link>
                </div>
                :
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    onClick={handleLogOutClick}
                  >
                    Log out
                  </Link>
                </div>
                }
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate overflow-hidden pt-14">
        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-800 ring-1 ring-black/10 hover:ring-black/50">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-orange-700">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
              Data to enrich your online business
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-800">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#c57743] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#d87d41] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-800">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
        </div>
      </div>
    </div>
  )
}

export default Home