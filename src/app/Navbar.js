import React from 'react'

export const Navbar = () => {
  console.log('Navbar renders')
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks"></div>
        </div>
      </section>
    </nav>
  )
}
