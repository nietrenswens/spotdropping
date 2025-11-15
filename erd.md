```mermaid
erDiagram
User {
    uuid id PK
    string email UNIQUE
    string passwordHash
    timestamp createdAt
}

Player {
    uuid id PK
    uuid gameId FK
    uuid userId FK
    string team
    timestamp joinedAt
}

Waypoint {
    uuid id PK
    uuid playerId FK
    timestamp moment
    decimal longitude
    decimal latitude
}

Checkpoint {
    uuid id PK
    uuid gameId FK
    string name
    decimal reward
    decimal longitude
    decimal latitude
}

CheckpointVisit {
    uuid id PK
    uuid checkpointId FK
    uuid playerId FK
    timestamp visitedAt
    string photoUrl "nullable"
}

Game {
    uuid id PK
    string status "waiting|in_progress|finished"
    int maxPlayers
    timestamp createdAt
    timestamp startTime "nullable"
    timestamp endTime "nullable"
}

User ||--o{ Player : "plays as"
Game ||--o{ Player : "has"
Game ||--o{ Checkpoint : "defines"
Player ||--o{ Waypoint : "tracks"
Player ||--o{ CheckpointVisit : "visits"
Checkpoint ||--o{ CheckpointVisit : "visited by"
```

**Unique Constraints:**

- `User.email` - unique across all users
- `CheckpointVisit (playerId, checkpointId)` - player can only visit each checkpoint once
