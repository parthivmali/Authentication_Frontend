import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { useLocation } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'

const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Profile', to: '/profile' },
    { name: 'Setting', to: '/setting' },
    { name: 'About', to: '/about' },
  ]

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [checkedLogin, setCheckedLogin] = useState(false)
  const location = useLocation();
    const handleLogOutClick = () => {
      Cookies.remove('jwt')
      Cookies.remove('userDetail')
      setCheckedLogin(false)
    }

    function classNames(...classes:string[]) {
      return classes.filter(Boolean).join(' ')
    }
  return (
    <div>
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
          <div className="flex md:hidden justify-end">
            <button
              type="button"
              className="-m-2.5 flex items-center justify-end rounded-md p-2.5 text-gray-400"
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
          {/* <div className="absolute right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={"#"}
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Your Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={"#"}
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Settings
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={"#"}
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      Sign out
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
              </Transition>
            </Menu>
          </div> */}
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
    </div>
  )
}

export default Navbar