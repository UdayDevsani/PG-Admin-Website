import React, { Component } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'

class Layout extends Component {
  render() {
    return (
      <div>
        <div class="container-scroller">
            <Header></Header>
        <div class="container-fluid page-body-wrapper">
            <Sidebar></Sidebar>
        <div class="main-panel">
        <div class="content-wrapper">
            <Home></Home>
        </div>
        </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Layout
