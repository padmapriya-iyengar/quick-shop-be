const connection = require('../root/db_connect')

const loadOrders = async(reqParams) => {
    let queryString = ''
    if(reqParams.xAxis == 'YEAR' && reqParams.yAxis == 'COUNT'){
        queryString = "SELECT YEAR(OrderDate) AS YEAR, COUNT(*) AS COUNT FROM ORDERS GROUP BY OrderDate;"
    }
    if(reqParams.xAxis == 'YEAR' && reqParams.yAxis == 'PRODUCT'){
        queryString = "SELECT YEAR(OrderDate) AS YEAR, ProductFk as PRODUCT, COUNT(*) AS COUNT  FROM ORDERS GROUP BY YEAR(OrderDate),ProductFk;"
    }
    if(reqParams.xAxis == 'CURRENT_YEAR_MONTH' && reqParams.yAxis == 'COUNT'){
        queryString = "SELECT MONTHNAME(OrderDate) AS CURRENT_YEAR_MONTH, COUNT(*) AS COUNT FROM ORDERS WHERE YEAR(ORDERDATE)= YEAR(CURDATE()) GROUP BY OrderDate;"
    }
    if(reqParams.xAxis == 'CURRENT_YEAR_MONTH' && reqParams.yAxis == 'PRODUCT'){
        queryString = "SELECT MONTHNAME(OrderDate) AS CURRENT_YEAR_MONTH, ProductFk as PRODUCT, COUNT(*) AS COUNT FROM ORDERS WHERE YEAR(ORDERDATE)= YEAR(CURDATE()) GROUP BY MONTHNAME(OrderDate),ProductFk;"
    }
    if(reqParams.xAxis == 'PAYMODE' && reqParams.yAxis == 'COUNT'){
        queryString = "SELECT PaymentMode AS PAYMODE, COUNT(*) AS COUNT FROM ORDERS GROUP BY PaymentMode;"
    }
    if(reqParams.xAxis == 'PRODUCT' && reqParams.yAxis == 'COUNT'){
        queryString = "SELECT ProductFk AS PRODUCT, COUNT(*) AS COUNT FROM ORDERS GROUP BY ProductFk;"
    }
    if(reqParams.xAxis == 'CUSTOMER' && reqParams.yAxis == 'COUNT'){
        queryString = "SELECT CustomerFk AS CUSTOMER, COUNT(*) AS COUNT FROM ORDERS GROUP BY CustomerFk;"
    }
    if(reqParams.xAxis == 'STATUS' && reqParams.yAxis == 'COUNT'){
        queryString = "SELECT CASE WHEN Status = '1' THEN 'Active' ELSE 'Inactive' END AS STATUS, COUNT(*) AS COUNT FROM ORDERS GROUP BY Status;"
    }
    if(reqParams.xAxis == 'CUSTOMER' && reqParams.yAxis == 'PRODUCT'){
        queryString = "SELECT CustomerFk as CUSTOMER, ProductFk as PRODUCT, COUNT(*) AS COUNT  FROM ORDERS GROUP BY ProductFk,CustomerFk;"
    }
    if(reqParams.xAxis == 'CUSTOMER' && reqParams.yAxis == 'PAYMODE'){
        queryString = "SELECT CustomerFk as CUSTOMER, PaymentMode as PAYMODE, COUNT(*) AS COUNT  FROM ORDERS GROUP BY CustomerFk,PaymentMode;"
    }
    return await connection.query(queryString,{type: connection.QueryTypes.SELECT})
}

const loadCustomers = async(reqParams) => {
    let queryString = ''
    if(reqParams.xAxis == 'YEAR' && reqParams.yAxis == 'COUNT'){
        queryString = "SELECT YEAR(CreatedOn) AS YEAR, COUNT(*) AS COUNT FROM CUSTOMERS GROUP BY CreatedOn;"
    }
    if(reqParams.xAxis == 'CURRENT_YEAR_MONTH' && reqParams.yAxis == 'COUNT'){
        queryString = "SELECT MONTHNAME(CreatedOn) AS CURRENT_YEAR_MONTH, COUNT(*) AS COUNT FROM CUSTOMERS WHERE YEAR(CreatedOn)= YEAR(CURDATE()) GROUP BY CreatedOn;"
    }
    if(reqParams.xAxis == 'STATUS' && reqParams.yAxis == 'COUNT'){
        queryString = "SELECT CASE WHEN Status = '1' THEN 'Active' ELSE 'Inactive' END AS STATUS, COUNT(*) AS COUNT FROM CUSTOMERS GROUP BY Status;"
    }
    return await connection.query(queryString,{type: connection.QueryTypes.SELECT})
}

const loadProducts = async(reqParams) => {
    let queryString = ''
    if(reqParams.xAxis == 'YEAR' && reqParams.yAxis == 'COUNT'){
        queryString = "SELECT YEAR(CreatedOn) AS YEAR, COUNT(*) AS COUNT FROM PRODUCTS GROUP BY CreatedOn;"
    }
    if(reqParams.xAxis == 'CURRENT_YEAR_MONTH' && reqParams.yAxis == 'COUNT'){
        queryString = "SELECT MONTHNAME(CreatedOn) AS CURRENT_YEAR_MONTH, COUNT(*) AS COUNT FROM PRODUCTS WHERE YEAR(CreatedOn)= YEAR(CURDATE()) GROUP BY CreatedOn;"
    }
    if(reqParams.xAxis == 'STATUS' && reqParams.yAxis == 'COUNT'){
        queryString = "SELECT CASE WHEN Status = '1' THEN 'Active' ELSE 'Inactive' END AS STATUS, COUNT(*) AS COUNT FROM PRODUCTS GROUP BY Status;"
    }
    return await connection.query(queryString,{type: connection.QueryTypes.SELECT})
}

module.exports = {
    loadOrders,
    loadCustomers,
    loadProducts
}