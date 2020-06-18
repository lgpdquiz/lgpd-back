## Run Script
- `yarn start:dev` : run application in watch mode (recommended)
- `yarn start`     : run application in normal mode

### Link for access development mode:
- [localhost:3333/start]:
    `generate all the static questions what was writed inside the code`

### Questions: 
- [localhost:3333/questions]:
    `returns all questions as array of object`
- [localhost:3333/questions/database]: 
    `returns all questions but straight from the database`
- [localhost:3333/questions/:id]:
    `returns question from an specific id`
- [localhost:3333/questions/count]:
    `returns a number of how many questions have in the table(questions) from database <working...>`

### Answers:
 - [localhost:3333/answers]
    `returns all answers as array of object`
 - [localhost:3333/answers/:id]
    `returns answer from an specific id`
### Players:
 - [localhost:3333/players]
     `returns all players as array of object`
 - [localhost:3333/players/:id]
    `returns question from an specific id`
 - [localhost:3333/players/create]
    `create a new player`
 - [localhost:3333/players/:id/update]
    `update player by id`
 - [localhost:3333/players/:id/delete]
    `delete player by id`
### Match:
 - [localhost:3333/match/start]
    `start the match`
- [localhost:3333/match/stop]
    `cancel the match`
- [localhost:3333/match/getRandomQuestion]
    `returns question that was drawn in the question`
- [localhost:3333/match/finalResult]
    `returns final result of a play (only available when end a play)`
- [localhost:3333/match/timer]
    `return current state from timer`
- [localhost:3333/match/click/:id]
    `select answer from random question in game by id`
    
    
    

  
