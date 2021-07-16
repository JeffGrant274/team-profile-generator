const genManager = function(Manager){
  
return `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${Manager.name}</h5>
          <p class="card-text">Manager</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Employee Id:${Manager.id}</li>
          <li class="list-group-item">Email Address:${Manager.email}</li>
          <li class="list-group-item">Office Number:${Manager.offNum}</li>
        </ul>
      </div>
`
}


const genIntern =function(Intern){
return `
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${Intern.name}</h5>
          <p class="card-text">Intern</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Employee Id:${Intern.id}</li>
          <li class="list-group-item">Email Address:${Intern.email}</li>
          <li class="list-group-item">School:${Intern.school}</li>
        </ul>
      </div>
      `
}

const genEngineer = function(Engineer){
return`
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${Engineer.getName}</h5>
          <p class="card-text">Engineer</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Employee Id:${Engineer.getId}</li>
          <li class="list-group-item">Email Address:${Engineer.getEmail}</li>
          <li class="list-group-item">Github:${Engineer.getGithub}</li>
        </ul>
      </div>
</div>
`
}

const genPage = function(staff){
return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">


    <title>Team Profile</title>
    <link rel="stylesheet" href ="./profile.css">
</head>
<body>
    <div class="head">
    <h1>Team Profile</h1>
    </div>
    <div class = "page-box">
   ${genManager(staff.filter(staff => staff.role == 'Manager'))}
    ${genEngineer(staff.filter(staff => staff.role=='Engineer'))}
     ${genIntern(staff.filter(staff=>staff.role == 'Intern'))}

</body>
</html>
`
}

module.exports = genPage;