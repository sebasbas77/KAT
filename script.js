body {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 10px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

form label {
    font-weight: bold;
}

form input, form select, form textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    font-size: 16px;
}

button {
    padding: 10px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    font-size: 14px;
}

th {
    background-color: #f2f2f2;
}

tr.yellow {
    background-color: #ffffcc;
}

tr.orange {
    background-color: #ffcc99;
}

tr.red {
    background-color: #ff9999;
}

#productDetails {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

@media (max-width: 600px) {
    body {
        margin: 10px;
        padding: 5px;
    }
    
    form input, form select, form textarea {
        font-size: 14px;
    }

    th, td {
        font-size: 12px;
    }
}

