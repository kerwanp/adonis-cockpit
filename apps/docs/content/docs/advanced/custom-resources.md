# Custom Resource

## Introduction

Adonis Cockpit has been build with extensibility in mind by giving you a `BaseResource` abstract class to connect with any kind of datasource.

```ts [app/cockpit/custom_resource.ts]
// title: app/cockpit/custom_resource.ts
import { BaseResource } from "adonis-cockpit";

type Record = {
  id: string;
  name: string;
};

export default class CustomResource<Record> extends BaseResource {
  name() {
    return "custom";
  }

  // ...
}
```

```ts [start/cockpit.ts]
// title: start/cockpit.ts
import cockpit from "adonis-cockpit/services/main";
import CustomResource from "#cockpit/custom_resource";

cockpit.register(CustomResource);
```

## Keys

### id

The `idKey` correspond to the propertyKey of your record identifier.

```ts
export default class CustomResource<Record> extends BaseResource {
  idKey() {
    return "id";
  }
}
```

### title

The `titleKey` is used to display the title/name of a record.

```ts
export default class CustomResource<Record> extends BaseResource {
  titleKey() {
    return "name";
  }
}
```

## Labels and Slug

### slug

The slug is used to generate the different routes in your Cockpit panel. It is optional as it defaults to the pluralized name of your resource.

```ts
export default class CustomResource<Record> extends BaseResource {
  slug() {
    return "customs";
  }
}
```

### label & labelPlural

The labels are the friendly name of your resource. It is optional as it defaults to the capitalized name of your resource.

```ts
export default class CustomResource<Record> extends BaseResource {
  name() {
    return "Custom";
  }

  namePlural() {
    return "Customs";
  }
}
```

## CRUD Operations

### Retrieve

The `retrieve` method is used to retrieve a single record using the [`idKey`](#id).

```ts
export default class CustomResource<Record> extends BaseResource {
  retrieve(id: RecordId): Promise<Record> {
    return customApi.find(id);
  }
}
```

### Create

The `create` method is used to create a single record.

```ts
export default class CustomResource<Record> extends BaseResource {
  create(data: any): Promise<Record> {
    return customApi.create(data);
  }
}
```

### List

The `list` method is used to list records. It must return a [`SimplePaginator`](https://lucid.adonisjs.com/docs/pagination) containing your records.

```ts
export default class CustomResource<Record> extends BaseResource {
  list(params: ApiIndexParams): Promise<SimplePaginator<Record>> {
    const result = customApi.list(params);
    return new SimplePaginator(
      result.total,
      result.perPage,
      result.page,
      ...result.items,
    );
  }
}
```

### Delete

The `delete` method is used to delete one or multiple records with their ids.

```ts
export default class CustomResource<Record> extends BaseResource {
  delete(...ids: RecordId[]): Promise<void> {
    const promises = ids.map((id) => customApi.delete(id));
    return promises.all();
  }
}
```
