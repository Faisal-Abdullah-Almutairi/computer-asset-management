
import { useEffect, useState } from 'react'
import './App.css'



function App() {
  const [assets, setAssets] = useState([])

  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [dashboardAssets, setDashboardAssets] = useState([])
  

useEffect(() => {
  async function loadAssets() {
    try {
      const response = await fetch(
        `/api/assets?page=${currentPage}&size=${pageSize}`
      )

      if (!response.ok) {
        throw new Error('Failed to load assets')
      }

      const data = await response.json()

      setAssets(data.content)
      setTotalPages(data.totalPages)
      setTotalElements(data.totalElements)
    } catch (error) {
      console.error('Error loading assets:', error)
    }
  }

  loadAssets()
}, [currentPage, pageSize])


useEffect(() => {
  async function loadDashboardAssets() {
    try {
      const response = await fetch('/api/assets?page=0&size=1000')

      if (!response.ok) {
        throw new Error('Failed to load dashboard assets')
      }

      const data = await response.json()
      setDashboardAssets(data.content)
    } catch (error) {
      console.error('Dashboard loading error:', error)
    }
  }

  loadDashboardAssets()
}, [assets])







const [searchTerm, setSearchTerm] = useState('')
const [searchedAsset, setSearchedAsset] = useState(null)
const [showForm, setShowForm] = useState(false)
const [editingId, setEditingId] = useState(null)
const [formData, setFormData] = useState({

  brand: '',
  model: '',
  assignedTo: '',
  status: 'Available',
})
  const [activePage, setActivePage] = useState('Dashboard')

  const menuItems = [
    'Dashboard',
    'All Assets',
    'About',
  ]

  
const filteredAssets = searchTerm.trim() && /^[1-9]\d*$/.test(searchTerm.trim())
  ? searchedAsset && String(searchedAsset.id) === searchTerm.trim()
    ? [searchedAsset]
    : []
  : assets.filter((asset) =>
      [
        asset.id,
        asset.brand,
        asset.model,
        asset.assignedTo,
        asset.status,
      ]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )

  const totalAssets = totalElements
  
const assignedAssets = dashboardAssets.filter(
  (asset) => asset.status === 'Assigned'
).length

const availableAssets = dashboardAssets.filter(
  (asset) => asset.status === 'Available'
).length

const maintenanceAssets = dashboardAssets.filter(
  (asset) => asset.status === 'Maintenance'
).length


  
async function handleSearch(value) {
  setSearchTerm(value)

  const query = value.trim()

  if (!query) {
    setSearchedAsset(null)
    return
  }

  
  if (/^[1-9]\d*$/.test(query)) {
    try {
      const response = await fetch(`/api/assets/${query}`)

      if (response.status === 404) {
        setSearchedAsset(null)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to search for asset')
      }

      const asset = await response.json()
      setSearchedAsset(asset)
    } catch (error) {
      console.error('Search error:', error)
      setSearchedAsset(null)
    }
  } else {
    setSearchedAsset(null)
  }
}


  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">C</div>
          <div>
            <h2>AssetFlow</h2>
            <p>Management System</p>
          </div>
        </div>

        <p className="menu-label">MAIN MENU</p>

        <nav className="navigation">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${
                activePage === item ? 'active' : ''
              }`}
              onClick={() => setActivePage(item)}
            >
              {item === 'Dashboard' && '▦'}
              {item === 'All Assets' && '▣'}
              {item === 'About' && 'ⓘ'}
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>Computer Asset Management</p>
          <span>Project Part 1 · React</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / {activePage}</p>
            <h1>{activePage}</h1>
          </div>
          <div className="user-profile">
            <div className="avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <p>IT Department</p>
            </div>
          </div>
        </header>

        {activePage === 'Dashboard' && (
          <section className="page-content">
            <div className="welcome">
              <div>
                <h2>Computer Assets Overview</h2>
                <p>
                  Monitor and manage your company computers
                  in one place.
                </p>
              </div>
              <span className="welcome-icon">▣</span>
            </div>

            <div className="stats-grid">
              <StatCard
                title="Total Assets"
                value={totalAssets}
                symbol="▣"
                color="blue"
              />
              <StatCard
                title="Assigned"
                value={assignedAssets}
                symbol="↗"
                color="purple"
              />
              <StatCard
                title="Available"
                value={availableAssets}
                symbol="✓"
                color="green"
              />
              <StatCard
                title="Maintenance"
                value={maintenanceAssets}
                symbol="⚙"
                color="orange"
              />
            </div>

            <section className="panel">
              <div className="panel-header">
                <div>
                  <h2>Recent Computer Assets</h2>
                  <p>Your company's registered computers</p>
                </div>
                <button
                  className="secondary-button"
                  onClick={() => setActivePage('All Assets')}
                >
                  View all assets →
                </button>
              </div>

              <AssetTable
  assets={assets.slice(0, 5)}
  setAssets={setAssets}
  setEditingId={setEditingId}
  setFormData={setFormData}
  setShowForm={setShowForm}
  setActivePage={setActivePage}
/>
            </section>
          </section>
        )}

        
{activePage === 'All Assets' && (
  <section className="page-content">
    <div className="panel">
      <div className="panel-header">
        <div>
          <h2>All Computer Assets</h2>
          <p>Manage the computers registered in the system.</p>
        </div>
        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Computer
        </button>
      </div>
      
{showForm && (
  <form
    className="asset-form"
    
onSubmit={async (event) => {
  event.preventDefault()

  try {
    
if (editingId !== null) {
  const response = await fetch(`/api/assets/${editingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error('Failed to update computer')
  }

  const updatedAsset = await response.json()

  setAssets((currentAssets) =>
    currentAssets.map((asset) =>
      asset.id === editingId ? updatedAsset : asset
    )
  )
}
 else {
      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to add computer')
      }

      const savedAsset = await response.json()

      setAssets((currentAssets) => [...currentAssets, savedAsset])
    }

    setFormData({
      assetTag: '',
      brand: '',
      model: '',
      assignedTo: '',
      status: 'Available',
    })

    setShowForm(false)
    setEditingId(null)
  } catch (error) {
    console.error('Error saving computer:', error)
    alert('Failed to save computer. Please try again.')
  }
}}

  >
    <h3>{editingId !== null ? 'Edit Computer' : 'Add New Computer'}</h3>

    <div className="form-grid">
      

      <input
        required
        placeholder="Brand (e.g. Dell)"
        value={formData.brand}
        onChange={(event) =>
          setFormData({ ...formData, brand: event.target.value })
        }
      />

      <input
        required
        placeholder="Model (e.g. Latitude 5550)"
        value={formData.model}
        onChange={(event) =>
          setFormData({ ...formData, model: event.target.value })
        }
      />

      <input
        placeholder="Assigned Employee (optional)"
        value={formData.assignedTo}
        onChange={(event) =>
          setFormData({ ...formData, assignedTo: event.target.value })
        }
      />

      <select
        value={formData.status}
        onChange={(event) =>
          setFormData({ ...formData, status: event.target.value })
        }
      >
        <option value="Available">Available</option>
        <option value="Assigned">Assigned</option>
        <option value="Maintenance">Maintenance</option>
      </select>
    </div>

    <div className="form-actions">
      <button type="submit" className="primary-button">
        {editingId !== null ? 'Update Computer' : 'Save Computer'}
      </button>
      <button
        type="button"
        className="secondary-button"
        onClick={() => setShowForm(false)}
      >
        Cancel
      </button>
    </div>
  </form>
)}

      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by ID, brand, model, employee, or status..."
          value={searchTerm}
          onChange={(event) => handleSearch(event.target.value)}
        />
        <span className="asset-count">
          {filteredAssets.length} assets
        </span>
      </div>

      



      
<AssetTable
  assets={filteredAssets}
  setAssets={setAssets}
  setEditingId={setEditingId}
  setFormData={setFormData}
  setShowForm={setShowForm}
  setActivePage={setActivePage}
/>
{!searchTerm.trim() && (
<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
    marginTop: '24px',
  }}
>
  <button
    type="button"
    disabled={currentPage === 0}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    Previous
  </button>

  <span>
    Page {currentPage + 1} of {Math.max(totalPages, 1)}
  </span>

  <button
    type="button"
    disabled={currentPage >= totalPages - 1}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next
  </button>
</div>
)}

    </div>
  </section>
)}



        {activePage === 'About' && (
          <section className="page-content">
            <div className="panel about-panel">
              <div className="about-icon">C</div>
              <h2>About AssetFlow</h2>
              <p>
                AssetFlow is a computer asset management
                application developed to help companies
                organize and monitor their computers and laptops.
              </p>
              <h3>Project Information</h3>
              <p><strong>Course project:</strong> Part 1 — React Frontend</p>
              <p><strong>Technology:</strong> React, JavaScript, CSS, Vite</p>
              <h3>Team Members</h3>

<div className="team-list">
  <div className="team-member">
    <strong>Faisal Abdullah Almutairi</strong>
    <p>Student ID: 221110840</p>
  </div>

  <div className="team-member">
    <strong>Abdualmajeed Abdualrahman Alqarni</strong>
    <p>Student ID: 218210787</p>
  </div>

  <div className="team-member">
    <strong>Faisal Saleh Alotaibi</strong>
    <p>Student ID: 221211338</p>
  </div>
  <div className="team-member">
    <strong>Faisal Alshathry</strong>
    <p>Student ID: 222111402</p>
  </div>
</div>
              
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function StatCard({ title, value, symbol, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{symbol}</div>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  )
}

function AssetTable({
  assets,
  setAssets,
  setEditingId,
  setFormData,
  setShowForm,
  setActivePage,
}) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          
          <tr>
          <th>ID</th>
        <th>Computer</th>
        <th>Assigned To</th>
          <th>Status</th>
            <th>Actions</th>
            </tr>

        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td><strong>{asset.id}</strong></td>
              <td>
                <div className="computer-cell">
                  <div className="computer-icon">▣</div>
                  <div>
                    <strong>{asset.brand}</strong>
                    <p>{asset.model}</p>
                  </div>
                </div>
              </td>
              <td>{asset.assignedTo}</td>
              <td>
                <span
                  className={`status ${
                    asset.status.toLowerCase()
                  }`}
                >
                  {asset.status}
                </span>
              </td>
              
<td>
  <button
  className="edit-button"
  type="button"
  onClick={() => {
    setEditingId(asset.id)
    setFormData({
  brand: asset.brand,
  model: asset.model,
  assignedTo: asset.assignedTo,
  status: asset.status,
})
    setShowForm(true)
    setActivePage('All Assets')
  }}
>
  Edit
</button>
  <button
  className="delete-button"
  type="button"
  
onClick={async () => {
  if (window.confirm('Are you sure you want to delete this computer?')) {
    try {
      const response = await fetch(`/api/assets/${asset.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete computer')
      }

      setAssets((currentAssets) =>
        currentAssets.filter((item) => item.id !== asset.id)
      )
    } catch (error) {
      console.error('Error deleting computer:', error)
      alert('Failed to delete computer. Please try again.')
    }
  }
}}

>
  Delete
</button>
</td>

            </tr>
          ))}
          {assets.length === 0 && (
            <tr>
              <td colSpan="5" className="empty-state">
                No computer assets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App

