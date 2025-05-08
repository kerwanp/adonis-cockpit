# Fields

## Searchable

Fields marked as searchable will be used to filter resources when user uses the search bar.

```ts
form.text('firstName').searchable()
```

You can also provide your own search function:

```ts
form.email('email').searchable(
  (query, field, value) => 
    query.orWhereLike(field.name, `%${value}`)
)
```

## Field Types

### Boolean Field

The `Boolean` field represent a boolean (true/false) or a tiny integer (0/1).

```ts
form.boolean("isAdmin");
```

You can configure custom true/false values by using `values` method.

```ts
boolean.make('status').values('published', 'draft')
```

### Email Field

The `Email` field is a simple `Text` field with email validation that display a `mailto:` link on the index and detail views.

```ts
form.email('email')
```

### Password Field

The `Password` field displays a password input with a score.

```ts
form.password("password");
```

### Select Field

The `Select` field creates a drop-down select in the form views. The options may be defined using the `options` method.

```ts
form.select('role', ['admin', 'user', 'guest'])
```

You may define custom labels by passing a `Record<string, string>` to the `options` method.

```ts
form.select("role", {
  admin: "Admin",
  user: "User",
  guest: "Guest",
});
```

### MultiSelect Field

The `MultiSelect` field is similar to the [`Select` field](#select-field) but allows multiple values to be selected.

```ts
form.multiselect("roles", {
  admin: "Admin",
  user: "User",
  guest: "Guest",
});
```

### Text Field

The `Text` field represents a `string` and displays a simple text input.

```ts
form.text("name");
```
