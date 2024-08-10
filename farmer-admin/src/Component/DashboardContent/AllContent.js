import React from 'react'
import LatestOrders from './LatestOrdes'
import LatestProducts from './LatestProducts'
import StatCards from './StatCard'
import GraphicalRepresentation from './GraphicalRepresentation'

function AllContent() {
  return (

    <>
    <StatCards />
     <div className="col-md-12 container mt-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <LatestProducts />
        </div>
        <div className="col-md-8 mb-4">
          <LatestOrders />
        </div>
      </div>

      <GraphicalRepresentation />
    </div> 
    </>
  )
}

export default AllContent