import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { selectNode } from '../reducers/clientsReducer'

const OLTFilterButton = () => {
  const olts = [
    { olt: 'Todas las OLT', id: 1 },
    { olt: 'Decimo', id: 22969 },
    { olt: 'Aromos', id: 22975 },
    { olt: 'Hudson', id: 12829 },
    { olt: 'Ugarteche', id: 12830 },
    { olt: 'Walmart', id: 22970 },
    { olt: 'Grutas', id: 22974 },
    { olt: 'Flavimari', id: 17437 },
    { olt: 'Castrol', id: 22973 },
    { olt: 'Beltran', id: 22972 },
    { olt: 'Cano', id: 22971 }
  ]

  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [OLTName, setOLTName] = useState(olts[0])

  const handleClick = (id) => {
    dispatch(selectNode(id))
    setIsOpen(false)
    setOLTName(olts.find(olt => olt.id === id))
  }

  const handleClickOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative flex justify-end w-full h-auto'>
      <div>
        <button onClick={handleClickOpen} type='button' className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' id='menu-button' aria-expanded='true' aria-haspopup='true'>
          {OLTName.olt}
          <svg className='-mr-1 h-5 w-5 text-gray-400' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
            <path fillRule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clipRule='evenodd' />
          </svg>
        </button>
      </div>

      {isOpen
        ? (
          <div className='absolute top-8 right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none' role='menu' aria-orientation='vertical' aria-labelledby='menu-button' tabIndex='-1'>
            <div className='py-1' role='none'>
              {olts.map(olt => (
                <button className='text-gray-700 block px-4 py-2 text-sm' type='button' key={olt.id} onClick={() => handleClick(olt.id)}>
                  {olt.olt}
                </button>
              ))}
            </div>
          </div>
          )
        : null}
    </div>
  )
}

export default OLTFilterButton
