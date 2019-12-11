import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Addtraining from './Addtraining';


export default function Customerlist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch (err => console.error(err))
    }

    const columns = [
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            sortable: false,
            filterable: false,
            width:150,
            Cell: row => 
            <Addtraining saveTraining = {saveTraining}/>
        },
        {
            sortable: false,
            filterable: false,
            width:100,
            accessor: 'links[1].href',
            Cell: row => 
            <div>
            <Button size = "small" color="secondary" onClick ={() => deleteTraining(row.value)}>Delete</Button>
            </div>
        },
    ]

    return (
        <div>
            <ReactTable filterable = {true} 
            sortable = {true} 
            defaultPageSize = {10} 
            data = {trainings} 
            columns = {columns} />
        </div>
    );
}