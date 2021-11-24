---
title: Maybe a little pain is a good thing when learning a language
date: '2021-11-24T06:56:26.624Z'
description: ''
---

As a newcomer to Go programming, it's very interesting to learn about the idioms and the ecosystem of the language, and to see how they differ from JavaScript.

After some time, certain tools seem like the obvious choice for accomplishing a task in a particular language, but when working with a new language, the limbo of not knowing what tool to choose can be kind of exhilarating. Additionally, encountering errors is where the learning happens, which also hopefully forces us to consider in more detail what our code is doing.

I started working on a little web app in Go, and after settling on Postgres as my db of choice, was immediately confronted with a cascade of options for how to incorporate it into my project.

Here are some of the options I looked at, in no particular order:

- standard library (Go's native `database/sql` package) with the [lib/pq](https://github.com/lib/pq) driver
- standard library with the [pgx](https://github.com/jackc/pgx) driver
- `pgx` interface of the `pgx` toolkit instead of using it as a driver for the standard library
- [pgxpool](https://github.com/jackc/pgx#githubcomjackcpgxv4pgxpool) connection pool in conjunction with `pgx`
- standard library with one of aforementioned postgres drivers and with `sqlx` [extensions](https://github.com/jmoiron/sqlx)
- [squirrel](https://github.com/Masterminds/squirrel) fluent SQL generator / database wrapper
- [sqlc](https://github.com/kyleconroy/sqlc) SQL -> Go transpiler
- [GORM](https://github.com/go-gorm/gorm) ORM for Go

At the moment, my primary motivation is to learn Go. For this reason, I'm happy to take on some tedium and some frustration, even if there is a better, faster, cleaner way of doing things. So I debated for a while which option was the best for me.

If I were to select the most barebones approach and go with just the standard library, my queries would look something like this:

```go
// User is a user model
type User struct {
  UserName  string
  Email     string
  CreatedAt time.Time
}

// GetUser retrieves a user model
func (db *Database) GetUser(username string) (User, error) {
  var user User

  err := db.QueryRow("select * from users where user_name = $1;", username).Scan(&user.UserName, &user.Email, &user.CreatedAt)

  if err != nil {
    log.Printf("User retrieval failed: %v\n", err)
    return user, err
  }

  return user, nil
}
```

The above approach is prone to a few different types of errors.

For instance, I have to be very mindful of the order and number of the arguments I give to `Scan`. If I mess up the quantity, my query will return an error telling me that the number of field descriptions (columns) must equal the number of destinations (struct fields)and my operation will fail. Messing up the order may not throw an error, but it may marshal a `username` column into the `email` field of the `User` struct.

Something like `sqlc` would get rid of pretty much all of these error for me, since all I would have to do is define my db models and write some SQL. If I can get that right, `sqlc` will [generate](https://play.sqlc.dev/) the rest for me. It's not magic, but it's pretty damn magical.

Ultimately, though, I didn't end up using it, reaching instead for [pgxpool](https://github.com/jackc/pgx#githubcomjackcpgxv4pgxpool), mentioned above (not quite the standard library, but a very similar interface). At this point in my trajectory, reaching for magic would be premature.

On the one hand, surely only a deranged person would deliberately create problems for themselves. On the other hand, I believe that if you haven't gone through the pain of, say, marshalling database rows into structs 'by hand', then maybe you won't fully appreciate what your tooling is doing for you. And perhaps you won't think too deeply about what is actually happening when you execute your program.

These things are in a curious tension - you definitely want production (-like) experience, which usually involves writing less code and making things easier for yourself. But you also need to learn the language and understand its patterns, so maybe you go easy on the tooling in favour of just using what the language makes available.

I think that occasionally picking the latter option will make me a better developer. For starters, I will better understand what types of errors it's possible to encounter with the given stack that I'm using, and what its most tedious aspects are. More importantly, perhaps, is that after taking the long way around, I'll finally see just _what it is_ about a tool that makes development easier. Then, by understanding the nature of the solution, I can extrapolate it to future problems.

To really maximize my learning I should, of course, just work with the language more. Beyond that, I should revisit past projects, and after implementing a feature using the standard library (or close to it), go back and refactor with the library/tool I avoided the first time around.

Sometimes, going through a bit of pain and tedium, especially when learning a new stack, is a worthwhile decision. If you're reaching for the painful solution every time, though, because it's what you know, then maybe you're spending a little too much time in your comfort zone.
