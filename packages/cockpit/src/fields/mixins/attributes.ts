type Constructor = new (...args: any[]) => {
  attributes: { [key: string]: any };
  options: { [key: string]: any };
};

type WithAttribute<T extends Constructor, TName extends string, TType> = T & {
  new (...args: any[]): InstanceType<T> & {
    attributes: { [key in TName]: TType };
  };
};

type WithOption<T extends Constructor, TName extends string, TType> = T & {
  new (...args: any[]): InstanceType<T> & {
    options: { [key in TName]: TType };
  };
};

export function WithRequired<T extends Constructor>(superclass: T) {
  class WithRequiredImpl extends superclass {
    /**
     * Marks this field as required.
     */
    required(value = true): this {
      this.attributes["required"] = value;
      return this;
    }
  }

  return WithRequiredImpl as any as WithAttribute<
    typeof WithRequiredImpl,
    "required",
    boolean
  >;
}

export function WithPlaceholder<T extends Constructor>(superclass: T) {
  class WithPlaceholderImpl extends superclass {
    /**
     * Defines a placeholder.
     */
    placeholder(value: string) {
      this.attributes["placeholder"] = value;
      return this;
    }
  }

  return WithPlaceholderImpl as any as WithAttribute<
    typeof WithPlaceholderImpl,
    "placeholder",
    string
  >;
}

export function WithDisabled<T extends Constructor>(superclass: T) {
  class WithDisabledImpl extends superclass {
    /**
     * Disable the field.
     */
    disabled(value = true) {
      this.attributes["disabled"] = value;
      return this;
    }
  }

  return WithDisabledImpl as any as WithAttribute<
    typeof WithDisabledImpl,
    "disabled",
    boolean
  >;
}

export function WithInputType<T extends Constructor>(superclass: T) {
  class WithDisabledImpl extends superclass {
    /**
     * Defines the input type.
     */
    type(value: string) {
      this.attributes["type"] = value;
      return this;
    }
  }

  return WithDisabledImpl as any as WithAttribute<
    typeof WithDisabledImpl,
    "type",
    string
  >;
}

export function WithHint<T extends Constructor>(superclass: T) {
  class WithHintImpl extends superclass {
    /**
     * Defines the field hint.
     */
    hint(value: string) {
      this.options["hint"] = value;
      return this;
    }
  }

  return WithHintImpl as any as WithOption<typeof WithHintImpl, "hint", string>;
}
