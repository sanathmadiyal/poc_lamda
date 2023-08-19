const { insertOne, insertMany, findOne } = require('./dbConnectors');

const createEmployee = async () => {
  const employeeData = {
    name: 'John Doe',
    age: 30,
    department: 'IT'
  };

  try {
    const insertedId = await insertOne(employeeData);
    console.log('Employee created with ID:', insertedId);
  } catch (error) {
    console.error('Error creating employee:', error);
  }
};

const createMultipleEmployees = async () => {
  const employeesData = [
    {
      name: 'Jane Smith',
      age: 25,
      department: 'HR'
    },
    {
      name: 'Mike Johnson',
      age: 35,
      department: 'Finance'
    },
  ];

  try {
    const insertedIds = await insertMany(employeesData);
    console.log('Employees created with IDs:', insertedIds);
  } catch (error) {
    console.error('Error creating employees:', error);
  }
};

const fetchEmployee = async () => {
  const query = { name: 'Jane Smith' };
  try {
    const employee = await findOne(query);
    console.log('Fetched employee:', employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
  }
};
