import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';


export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch (err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch (err => console.error(err))
    }

    const columns = [
        {
            Header: 'First name',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Street address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Post code',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            sortable: false,
            filterable: false,
            width:100,
            Cell: row => 
            <Editcustomer updateCustomer = {updateCustomer} customer = {row.original}/>
        },
        {
            sortable: false,
            filterable: false,
            width:100,
            accessor: 'links.href',
            Cell: row => 
            <div>
            <Button size = "small" color="secondary" onClick ={() => deleteCustomer(row.value)}>Delete</Button>
            </div>
        },
    ]

    return (
        <div>
            <Addcustomer saveCustomer = {saveCustomer}/>
            <ReactTable filterable = {true} 
            sortable = {true} 
            defaultPageSize = {10} 
            data = {customers} 
            columns = {columns} />
        </div>
    );
}