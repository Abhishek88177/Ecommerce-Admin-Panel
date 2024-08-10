import React from 'react'
import AddCategory from './AddCategory'
import CategoryTable from './CategoryTable'

function Category() {
  return (
    <>
    <div className='container'> 
        <div className='col-md-12'>
            <div className='row'>
                <div className='col-md-4'>
                     <AddCategory />
                </div>
                <div className='col-md-8'>
                    <CategoryTable />
                </div>
            </div>
        </div>
    </div>
    </>

  )
}

export default Category