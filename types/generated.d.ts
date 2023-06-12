/**
 * List of all the Strapi attribute types
 */
export type AttributeType =
  | "string"
  | "text"
  | "richtext"
  | "email"
  | "password"
  | "date"
  | "time"
  | "datetime"
  | "timestamp"
  | "integer"
  | "biginteger"
  | "float"
  | "decimal"
  | "uid"
  | "enumeration"
  | "boolean"
  | "json"
  | "media"
  | "relation"
  | "component"
  | "dynamiczone";

/**
 * Most basic shape of a schema attribute
 */
export interface Attribute<T extends AttributeType = AttributeType> {
  /**
   * Type of the attribute
   */
  type: T;

  /**
   * Options defined and used by the plugins
   */
  pluginOptions?: object;
}

// Common attributes Options

export interface RequiredOption {
  required?: boolean;
}

export interface PrivateOption {
  private?: boolean;
}

export interface UniqueOption {
  unique?: boolean;
}

export interface DefaultOption<T> {
  default?: T;
}

export interface ConfigurableOption {
  configurable?: boolean;
}

export interface MinMaxOption<T = number> {
  min?: T;
  max?: T;
}

export interface MinMaxLengthOption {
  minLength?: number;
  maxLength?: number;
}

export type BigIntegerAttribute = Attribute<"biginteger"> &
  // Options
  ConfigurableOption &
  DefaultOption<BigIntegerValue> &
  MinMaxOption<string> &
  PrivateOption &
  RequiredOption;

export type BigIntegerValue = string;

export type GetBigIntegerAttributeValue<T extends Attribute> =
  T extends BigIntegerAttribute ? BigIntegerValue : never;

export type BooleanAttribute = Attribute<"boolean"> &
  // Options
  ConfigurableOption &
  DefaultOption<BooleanValue> &
  PrivateOption &
  RequiredOption;

export type BooleanValue = boolean;

export type GetBooleanAttributeValue<T extends Attribute> =
  T extends BooleanAttribute ? BooleanValue : never;

export type JSON<T extends object = object> = T;

export type Media = any;

/**
 * Setters for the attributes options
 */

// required
export type RequiredAttribute = { required: true };
export type NonRequiredAttribute = { required: false };

// private
export type PrivateAttribute = { private: true };
export type NonPrivateAttribute = { private: false };

// unique
export type UniqueAttribute = { unique: true };
export type NonUniqueAttribute = { unique: false };

// configurable
export type ConfigurableAttribute = { configurable: true };
export type NonConfigurableAttribute = { configurable: false };

// custom field
export type CustomField<T extends string, P extends object = undefined> = {
  customField: T;
  options?: P;
};

// min/max
export type SetMinMax<T extends MinMaxOption<U>, U = number> = T;

// minLength/maxLength
export type SetMinMaxLength<T extends MinMaxLengthOption> = T;

// pluginOptions
export type SetPluginOptions<T extends object = object> = { pluginOptions?: T };

// default
export type DefaultTo<T> = { default: T };

export interface ComponentAttributeProperties<
  // Targeted component
  T extends Strapi.ComponentUIDs,
  // Repeatable
  R extends boolean = false
> {
  component: T;
  repeatable?: R;
}

export type ComponentAttribute<
  // Targeted component
  T extends Strapi.ComponentUIDs,
  // Repeatable
  R extends boolean = false
> = Attribute<"component"> &
  // Component Properties
  ComponentAttributeProperties<T, R> &
  // Options
  ConfigurableOption &
  MinMaxOption &
  PrivateOption &
  RequiredOption;

export type ComponentValue<
  T extends Strapi.ComponentUIDs,
  R extends boolean
> = GetAttributesValues<T> extends infer V ? (R extends true ? V[] : V) : never;

export type GetComponentAttributeValue<T extends Attribute> =
  T extends ComponentAttribute<infer U, infer R> ? ComponentValue<U, R> : never;

export type DateTimeAttribute = Attribute<"datetime"> &
  // Options
  ConfigurableOption &
  DefaultOption<DateTimeValue> &
  PrivateOption &
  RequiredOption &
  UniqueOption;

export type DateTimeValue = string;

export type GetDateTimeAttributeValue<T extends Attribute> =
  T extends DateTimeAttribute ? DateTimeValue : never;

export type DateAttribute = Attribute<"date"> &
  // Options
  ConfigurableOption &
  DefaultOption<DateValue> &
  PrivateOption &
  RequiredOption &
  UniqueOption;

export type DateValue = Date;

export type GetDateAttributeValue<T extends Attribute> = T extends DateAttribute
  ? DateValue
  : never;

export type DecimalAttribute = Attribute<"decimal"> &
  // Options
  ConfigurableOption &
  DefaultOption<DecimalValue> &
  MinMaxOption &
  PrivateOption &
  RequiredOption;

export type DecimalValue = number;

export type GetDecimalAttributeValue<T extends Attribute> =
  T extends DecimalAttribute ? DecimalValue : never;

export interface DynamicZoneAttributeProperties<
  T extends Strapi.ComponentUIDs[] = []
> {
  components: T;
}

export type DynamicZoneAttribute<T extends Strapi.ComponentUIDs[] = []> =
  Attribute<"dynamiczone"> &
    // Properties
    DynamicZoneAttributeProperties<T> &
    // Options
    ConfigurableOption &
    MinMaxOption &
    RequiredOption;

type DynamicZoneValue<T extends Strapi.ComponentUIDs[]> = Array<
  GetArrayValues<T> extends infer P
    ? P extends SchemaUID
      ? GetAttributesValues<P> & { __component: P }
      : never
    : never
>;

export type GetDynamicZoneAttributeValue<T extends Attribute> =
  T extends DynamicZoneAttribute<infer U> ? DynamicZoneValue<U> : never;

export type EmailAttribute = Attribute<"email"> &
  // Options
  ConfigurableOption &
  DefaultOption<EmailValue> &
  MinMaxLengthOption &
  PrivateOption &
  RequiredOption &
  UniqueOption;

export type EmailValue = string;

export type GetEmailAttributeValue<T extends Attribute> =
  T extends EmailAttribute ? EmailValue : never;

export interface EnumerationAttributeProperties<T extends string[] = []> {
  enum: T;
}

export type EnumerationAttribute<T extends string[] = []> =
  Attribute<"enumeration"> &
    EnumerationAttributeProperties<T> &
    // Options
    ConfigurableOption &
    DefaultOption<T> &
    PrivateOption &
    RequiredOption;

export type EnumerationValue<T extends string[]> = GetArrayValues<T>;

export type GetEnumerationAttributeValue<T extends Attribute> =
  T extends EnumerationAttribute<infer U> ? EnumerationValue<U> : never;

export type FloatAttribute = Attribute<"float"> &
  // Options
  ConfigurableOption &
  DefaultOption<FloatValue> &
  MinMaxOption &
  PrivateOption &
  RequiredOption;

export type FloatValue = number;

export type GetFloatAttributeValue<T extends Attribute> =
  T extends FloatAttribute ? FloatValue : never;
export * from "./base";

export * from "./biginteger";
export * from "./boolean";
export * from "./component";
export * from "./decimal";
export * from "./dynamic-zone";
export * from "./enumeration";
export * from "./float";
export * from "./integer";
export * from "./json";
export * from "./media";
export * from "./password";
export * from "./relation";
export * from "./richtext";
export * from "./string";
export * from "./text";
export * from "./uid";
export * from "./email";
export * from "./date";
export * from "./date-time";
export * from "./timestamp";
export * from "./time";

export * from "./common";
export * from "./utils";

export type IntegerAttribute = Attribute<"integer"> &
  // Options
  ConfigurableOption &
  DefaultOption<IntegerValue> &
  MinMaxOption &
  PrivateOption &
  RequiredOption;

export type IntegerValue = number;

export type GetIntegerAttributeValue<T extends Attribute> =
  T extends IntegerAttribute ? IntegerValue : never;

export type JSONAttribute = Attribute<"json"> &
  //Options
  ConfigurableOption &
  RequiredOption &
  PrivateOption;

export type JsonValue = JSON;

export type GetJsonAttributeValue<T extends Attribute> = T extends JSONAttribute
  ? JsonValue
  : never;

export type AllowedMediaTypes = "images" | "videos" | "files" | "audios";

export interface MediaAttributeProperties<
  // Media Type
  T extends AllowedMediaTypes = undefined,
  // Multiple
  U extends boolean = false
> {
  allowedTypes?: T;
  multiple?: U;
}

export type MediaAttribute<
  // Media Type
  T extends AllowedMediaTypes = undefined,
  // Multiple
  U extends boolean = false
> = Attribute<"media"> &
  // Properties
  MediaAttributeProperties<T, U> &
  // Options
  ConfigurableOption &
  RequiredOption &
  PrivateOption;

export type MediaValue<T extends boolean = false> = T extends true
  ? Media[]
  : Media;

export type GetMediaAttributeValue<T extends Attribute> =
  T extends MediaAttribute<infer _U, infer S> ? MediaValue<S> : never;

export type PasswordAttribute = Attribute<"password"> &
  // Options
  ConfigurableOption &
  DefaultOption<PasswordValue> &
  MinMaxLengthOption &
  PrivateOption &
  RequiredOption;

export type PasswordValue = string;

export type GetPasswordAttributeValue<T extends Attribute> =
  T extends PasswordAttribute ? PasswordValue : never;

export type BasicRelationsType =
  | "oneToOne"
  | "oneToMany"
  | "manyToOne"
  | "manyToMany";
export type PolymorphicRelationsType =
  | "morphToOne"
  | "morphToMany"
  | "morphOne"
  | "morphMany";
export type RelationsType = BasicRelationsType | PolymorphicRelationsType;

export interface BasicRelationAttributeProperties<
  S extends SchemaUID,
  R extends RelationsType,
  T extends SchemaUID
> {
  relation: R;
  target: T;
  inversedBy?: RelationsKeysFromTo<T, S>;
  mappedBy?: RelationsKeysFromTo<T, S>;
}

export interface PolymorphicRelationAttributeProperties<
  R extends RelationsType
> {
  relation: R;
}

export type RelationAttribute<
  S extends SchemaUID,
  R extends RelationsType,
  T extends R extends PolymorphicRelationsType ? never : SchemaUID = never
> = Attribute<"relation"> &
  // Properties
  (R extends BasicRelationsType
    ? BasicRelationAttributeProperties<S, R, T>
    : PolymorphicRelationAttributeProperties<R>) &
  // Options
  ConfigurableOption &
  PrivateOption;

export type RelationsKeysFromTo<
  TTarget extends SchemaUID,
  TSource extends SchemaUID
> = keyof PickRelationsFromTo<TTarget, TSource>;

export type PickRelationsFromTo<
  TTarget extends SchemaUID,
  TSource extends SchemaUID
> = GetAttributesByType<TTarget, "relation", { target: TSource }>;

export type RelationPluralityModifier<
  TRelation extends RelationsType,
  TValue extends Record<string, unknown>
> = TRelation extends `${string}Many` ? TValue[] : TValue;

export type RelationValue<
  TRelation extends RelationsType,
  TTarget extends SchemaUID
> = RelationPluralityModifier<TRelation, GetAttributesValues<TTarget>>;

export type GetRelationAttributeValue<T extends Attribute> =
  T extends RelationAttribute<infer _TSource, infer TRelation, infer TTarget>
    ? RelationValue<TRelation, TTarget>
    : never;

export type RichTextAttribute = Attribute<"richtext"> &
  // Options
  ConfigurableOption &
  DefaultOption<RichTextValue> &
  MinMaxLengthOption &
  PrivateOption &
  RequiredOption;

export type RichTextValue = string;

export type GetRichTextAttributeValue<T extends Attribute> =
  T extends RichTextAttribute ? RichTextValue : never;

export interface StringAttributeProperties {
  regex?: RegExp;
}

export type StringAttribute = Attribute<"string"> &
  // Properties
  StringAttributeProperties &
  // Options
  ConfigurableOption &
  DefaultOption<StringValue> &
  MinMaxLengthOption &
  PrivateOption &
  UniqueOption &
  RequiredOption;

export type StringValue = string;

export type GetStringAttributeValue<T extends Attribute> =
  T extends StringAttribute ? StringValue : never;

export interface TextAttributeProperties {
  regex?: RegExp;
}

export type TextAttribute = Attribute<"text"> &
  // Properties
  TextAttributeProperties &
  // Options
  ConfigurableOption &
  DefaultOption<TextValue> &
  MinMaxLengthOption &
  PrivateOption &
  UniqueOption &
  RequiredOption;

export type TextValue = string;

export type GetTextAttributeValue<T extends Attribute> = T extends TextAttribute
  ? TextValue
  : never;

export type TimeAttribute = Attribute<"time"> &
  // Options
  ConfigurableOption &
  DefaultOption<TimeValue> &
  PrivateOption &
  RequiredOption &
  UniqueOption;

export type TimeValue = string;

export type GetTimeAttributeValue<T extends Attribute> = T extends TimeAttribute
  ? TimeValue
  : never;

export type TimestampAttribute = Attribute<"timestamp"> &
  // Options
  ConfigurableOption &
  DefaultOption<TimestampValue> &
  PrivateOption &
  RequiredOption &
  UniqueOption;

export type TimestampValue = string;

export type GetTimestampAttributeValue<T extends Attribute> =
  T extends TimestampAttribute ? TimestampValue : never;

export interface UIDAttributeOptions {
  separator?: string;
  lowercase?: boolean;
  decamelize?: boolean;
  customReplacements?: Array<[string, string]>;
  preserveLeadingUnderscore?: boolean;
}

export interface UIDAttributeProperties<
  // Own Schema Reference
  T extends SchemaUID | undefined = undefined,
  // Target attribute
  U extends T extends SchemaUID
    ? GetAttributesKeysByType<T, "string" | "text">
    : undefined = undefined,
  // UID options
  S extends UIDAttributeOptions = UIDAttributeOptions
> {
  targetField?: U;
  options?: UIDAttributeOptions & S;
}

export type UIDAttribute<
  // Own Schema Reference
  T extends SchemaUID | undefined = undefined,
  // Target attribute
  U extends T extends SchemaUID
    ? GetAttributesKeysByType<T, "string" | "text">
    : undefined = undefined,
  // UID options
  S extends UIDAttributeOptions = UIDAttributeOptions
> = Attribute<"uid"> &
  // Properties
  UIDAttributeProperties<T, U, S> &
  // Options
  ConfigurableOption &
  DefaultOption<UIDValue> &
  MinMaxLengthOption &
  PrivateOption &
  RequiredOption;

export type UIDValue = string;

export type GetUIDAttributeValue<T extends Attribute> = T extends UIDAttribute<
  infer _U,
  infer _P
>
  ? UIDValue
  : never;

export type PickTypes<T extends AttributeType> = T;

export type GetAttributesKeysByType<
  T extends SchemaUID,
  U extends AttributeType,
  P = never
> = KeysBy<GetAttributes<T>, Attribute<U> & NeverGuard<P, unknown>>;

export type GetAttributesByType<
  T extends SchemaUID,
  U extends AttributeType,
  P = never
> = PickBy<GetAttributes<T>, Attribute<U> & NeverGuard<P, unknown>>;

export type GetAttribute<
  T extends SchemaUID,
  U extends GetAttributesKey<T>
> = Get<GetAttributes<T>, U>;

export type GetAttributes<T extends SchemaUID> = Get<
  Strapi.Schemas[T],
  "attributes"
>;

export type GetAttributesKey<T extends SchemaUID> = keyof GetAttributes<T>;

export type GetAttributeValue<T extends Attribute> =
  | GetBigIntegerAttributeValue<T>
  | GetBooleanAttributeValue<T>
  | GetComponentAttributeValue<T>
  | GetDecimalAttributeValue<T>
  | GetDynamicZoneAttributeValue<T>
  | GetEnumerationAttributeValue<T>
  | GetEmailAttributeValue<T>
  | GetFloatAttributeValue<T>
  | GetIntegerAttributeValue<T>
  | GetJsonAttributeValue<T>
  | GetMediaAttributeValue<T>
  | GetPasswordAttributeValue<T>
  | GetRelationAttributeValue<T>
  | GetRichTextAttributeValue<T>
  | GetStringAttributeValue<T>
  | GetTextAttributeValue<T>
  | GetUIDAttributeValue<T>
  | GetMediaAttributeValue<T>
  | GetDateAttributeValue<T>
  | GetDateTimeAttributeValue<T>
  | GetTimeAttributeValue<T>
  | GetTimestampAttributeValue<T>;

export type GetAttributeValueByKey<
  T extends SchemaUID,
  U extends GetAttributesKey<T>
> = GetAttribute<T, U> extends infer P
  ? P extends Attribute
    ? GetAttributeValue<P>
    : never
  : never;

export type GetAttributesValues<T extends SchemaUID> = {
  // Handle required attributes
  [key in GetAttributesRequiredKeys<T>]-?: GetAttributeValueByKey<T, key>;
} & {
  // Handle optional attributes
  [key in GetAttributesOptionalKeys<T>]?: GetAttributeValueByKey<T, key>;
};

export type GetAttributesRequiredKeys<T extends SchemaUID> = KeysBy<
  GetAttributes<T>,
  { required: true }
>;
export type GetAttributesOptionalKeys<T extends SchemaUID> = keyof Omit<
  GetAttributes<T>,
  GetAttributesRequiredKeys<T>
>;

export type AddCommandOptions = {
  command: Command;
  argv: Record<number, string>;
};
export * from "./attributes";
export * from "./schemas";
export * from "./strapi";

/**
 * Literal union type representing the possible natures of a content type
 */
export type ContentTypeKind = "singleType" | "collectionType";

/**
 * Literal union type representing the possible types of a model
 */
export type SchemaModelType = "contentType" | "component";

/**
 * Data structure that can either represent a content type or a component
 */
export interface Schema {
  /**
   * The type of the model. Useful to discriminate content-types from component
   */
  modelType: SchemaModelType;

  /**
   * Informations about schema naming and display
   */
  info: SchemaInfo;

  /**
   * Map of all the attributes with their name and definition
   */
  attributes: SchemaAttributes;

  /**
   * Options declared and read by the plugins
   */
  pluginOptions?: PluginOptions;

  /**
   * Options object dedicated to Strapi core features
   */
  options?: SchemaOptions;

  /**
   * Custom table name for the schema
   */
  collectionName?: string;
}

/**
 * Data structure containing naming and display information for a Schema
 */
export interface SchemaInfo {
  /**
   * Default name to use in the admin panel
   */
  displayName: string;

  /**
   * Singular form of the content type name
   */
  singularName?: string;

  /**
   * Plural form of the collection type name
   */
  pluralName?: string;

  /**
   * Description of the model
   */
  description?: string;

  /**
   * FontAwesome (v5) icon name to use for the component's icon in the admin panel
   */
  icon?: string;
}

/**
 * Low level data structure referencing every schema attribute and its name
 */
export interface SchemaAttributes extends StringRecord<Attribute> {}

/**
 * Structure containing every core schema options and their associated value
 */
export interface SchemaOptions {
  draftAndPublish?: boolean;
  populateCreatorFields?: boolean;
  comment?: string;
}

export interface PluginOptions {}

/**
 * Schema for a content type
 */
export interface ContentTypeSchema extends Schema {
  modelType: "contentType";

  /**
   * Unique identifier of the schema
   */
  uid: SchemaUID;

  /**
   * Determine the type of the content type (single-type or collection-type)
   */
  kind: ContentTypeKind;
}

/**
 * Schema for a collection type
 */
export interface CollectionTypeSchema extends ContentTypeSchema {
  kind: "collectionType";
}

/**
 * Schema for a single type
 */
export interface SingleTypeSchema extends ContentTypeSchema {
  kind: "singleType";
}

/**
 * Schema for a component
 */
export interface ComponentSchema extends Schema {
  modelType: "component";
}

// TODO move custom fields types to a separate file
interface CustomFieldServerOptions {
  /**
   * The name of the custom field
   */
  name: string;

  /**
   * The name of the plugin creating the custom field
   */
  plugin?: string;

  /**
   * The existing Strapi data type the custom field uses
   */
  type: string;

  /**
   * Settings for the input size in the Admin UI
   */
  inputSize?: {
    default: 4 | 6 | 8 | 12;
    isResizable: boolean;
  };
}

interface CustomFields {
  register: (
    customFields: CustomFieldServerOptions[] | CustomFieldServerOptions
  ) => void;
}

/**
 * The Strapi interface implemented by the main Strapi class.
 */
export interface Strapi {
  /**
   * Getter for the Strapi enterprise edition configuration
   */
  readonly EE: any;

  /**
   * Getter for the Strapi configuration container
   */
  readonly config: any;

  /**
   * Getter for the Strapi auth container
   */
  readonly auth: any;

  /**
   * Getter for the Strapi content API container
   */
  readonly contentAPI: any;

  /**
   * Getter for the Strapi sanitizers container
   */
  readonly sanitizers: any;

  /**
   * Getter for the Strapi services container
   *
   * It returns all the registered services
   */
  readonly services: StringMap<GenericService>;

  /**
   * Find a service using its unique identifier
   */
  service<T extends GenericService = GenericService>(
    uid: string
  ): T | undefined;

  /**
   * Getter for the Strapi controllers container
   *
   * It returns all the registered controllers
   */
  readonly controllers: StringMap<GenericController>;

  /**
   * Find a controller using its unique identifier
   */
  controller(uid: string): GenericController | undefined;

  /**
   * Getter for the Strapi content types container
   *
   * It returns all the registered content types
   */
  readonly contentTypes: any;

  /**
   * Find a content type using its unique identifier
   */
  contentType(uid: string): any;

  /**
   * Getter for the Strapi component container
   *
   * It returns all the registered components
   */
  readonly components: any;

  /**
   * The custom fields registry
   *
   * It returns the custom fields interface
   */
  readonly customFields: CustomFields;

  /**
   * Getter for the Strapi policies container
   *
   * It returns all the registered policies
   */
  readonly policies: any;

  /**
   * Find a policy using its name
   */
  policy(name: string): any;

  /**
   * Getter for the Strapi middlewares container
   *
   * It returns all the registered middlewares
   */
  readonly middlewares: any;

  /**
   * Find a middleware using its name
   */
  middleware(): any;

  /**
   * Getter for the Strapi plugins container
   *
   * It returns all the registered plugins
   */
  readonly plugins: any;

  /**
   * Find a plugin using its name
   */
  plugin(name: string): any;

  /**
   * Getter for the Strapi hooks container
   *
   * It returns all the registered hooks
   */
  readonly hooks: any;

  /**
   * Find a hook using its name
   */
  hook(): any;

  /**
   * Getter for the Strapi APIs container
   *
   * It returns all the registered APIs
   */
  readonly api: any;

  /**
   * Strapi Register Lifecycle.
   *
   * - Load
   *   - The user application
   *   - The plugins
   *   - The admin
   *   - The APIs
   *   - The components
   *   - The middlewares
   *   - The policies
   * - Trigger Strapi internal bootstrap
   * - Create the webhooks runner
   * - Create the internal hooks registry.
   * - Init the telemetry cron job and middleware
   * - Run all the `register` lifecycle methods loaded by the user application or the enabled plugins
   */
  register(): Promise<Strapi>;

  /**
   * Bootstraping phase.
   *
   * - Load all the content types
   * - Initialize the database layer
   * - Initialize the entity service
   * - Run the schemas/database synchronization
   * - Start the webhooks and initializing middlewares and routes
   * - Run all the `bootstrap` lifecycle methods loaded by the
   * user application or the enabled plugins
   */
  bootstrap(): Promise<Strapi>;

  /**
   * Destroy phase
   *
   * - Destroy Strapi server
   * - Run all the `destroy` lifecycle methods loaded by the
   * user application or the enabled plugins
   * - Cleanup the event hub
   * - Gracefully stop the database
   * - Stop the telemetry and cron instance
   * - Cleanup the global scope by removing global.strapi
   */
  destroy(): Promise<void>;

  /**
   * Run all functions registered for a given lifecycle. (Strapi core, user app, plugins)
   */
  runLifecyclesFunctions<T extends Lifecycles[keyof Lifecycles]>(
    lifecycleName: T
  ): Promise<void>;

  /**
   * Load the application if needed and start the server
   */
  start(): Promise<void>;

  /**
   * Stop the server and provide a custom error and message
   */
  stopWithError<TError = unknown>(error: TError, customMessage?: string): void;

  /**
   * Gracefully stop the server
   * Call the destroy method.
   */
  stop(code?: number): void;

  /**
   * Load the server and the user application.
   * It basically triggers the register and bootstrap phases
   */
  load(): Promise<Strapi>;

  /**
   * Restart the server and reload all the configuration.
   * It re-runs all the lifecycles phases.
   *
   * @example
   * ``` ts
   * setImmediate(() => strapi.reload());
   * ```
   */
  reload(): () => void;

  /**
   * Initialize and start all the webhooks registered in the webhook store
   */
  startWebhooks(): Promise<void>;

  /**
   * Method called when the server is fully initialized and listen to incomming requests.
   * It handles tasks such as logging the startup message
   * or automatically opening the administration panel.
   */
  postListen(): Promise<void>;

  /**
   * Start listening for incomming requests
   */
  listen(): Promise<void | Error>;

  /**
   * Opent he administration panel in a browser if the option is enabled.
   * You can disable it using the admin.autoOpen configuration variable.
   *
   * Note: It only works in development envs.
   */
  openAdmin(options: { isInitialized: boolean }): Promise<void>;

  /**
   * Load the admin panel server logic into the server code and initialize its configuration.
   */
  loadAdmin(): Promise<void>;

  /**
   * Resolve every enabled plugin and load them into the application.
   */
  loadPlugins(): Promise<void>;

  /**
   * Load every global policies in the policies container by
   * reading from the `strapi.dirs.dist.policies` directory.
   */
  loadPolicies(): Promise<void>;

  /**
   * Load every APIs and their components (config, routes, controllers, services,
   * policies, middlewares, content-types) in the API container.
   */
  loadAPIs(): Promise<void>;

  /**
   * Resolve every components in the user application and store them in `strapi.components`
   */
  loadComponents(): Promise<void>;

  /**
   * Load every global and core middlewares in the middlewares container by
   * reading from the `strapi.dirs.dist.middlewares` and internal middlewares directory.
   */
  loadMiddlewares(): Promise<void>;

  /**
   * Load the user application in the server by reading the `src/index.js` file.
   */
  loadApp(): Promise<void>;

  /**
   * Add internal hooks to the hooks container.
   * Those hooks are meant for internal usage and might break in future releases.
   */
  registerInternalHooks(): void;

  /**
   * Find a model (content-type, component) based on its unique identifier.
   */
  getModel(uid: string): any;

  /**
   * Binds database queries for a specific model based on its unique identifier.
   */
  query(uid: string): any;

  /**
   * Main Strapi container holding all the registries and providers (config, content-types, services, policies, etc...)
   */
  container: any;

  /**
   * References to all the directories handled by Strapi
   */
  dirs: StrapiDirectories;

  /**
   * Internal flag used to check if the application has been loaded
   */
  isLoaded: boolean;

  /**
   * Fully reload the application
   */
  reload(): void;

  /**
   * Holds a reference to the Koa application and the http server used by Strapi
   */
  server: any;

  /**
   * Strapi util used to manage application files
   */
  fs: any;

  /**
   * Event hub used to send and receive events from anywhere in the application
   */
  eventHub: any;

  /**
   * Internal util used to log stats and messages on application Startup
   */
  startupLogger: any;

  /**
   * Strapi logger used to send errors, warning or information messages
   */
  log: any;

  /**
   * Used to manage cron within Strapi
   */
  cron: any;

  /**
   * Telemetry util used to collect anonymous data on the application usage
   */
  telemetry: any;

  /**
   * Used to access ctx from anywhere within the Strapi application
   */
  requestContext: any;

  /**
   * Strapi DB layer instance
   */
  db: Database;

  /**
   * Core Store accessor
   */
  store: any;

  /**
   * Entity Validator instance
   */
  entityValidator: any;

  /**
   * Entity Service instance
   */
  entityService: any;
}

export interface Lifecycles {
  REGISTER: "register";
  BOOTSTRAP: "bootstrap";
  DESTROY: "destroy";
}

export interface StrapiDirectories {
  static: {
    public: string;
  };
  app: {
    root: string;
    src: string;
    api: string;
    components: string;
    extensions: string;
    policies: string;
    middlewares: string;
    config: string;
  };
  dist: {
    root: string;
    src: string;
    api: string;
    components: string;
    extensions: string;
    policies: string;
    middlewares: string;
    config: string;
  };
}

type ControllerConfig<T extends Controller = Controller> = T;

type ServiceConfig = Service;

type HandlerConfig = {
  auth?: false | { scope: string[] };
  policies?: Array<string | Policy | { name: string; config: object }>;
  middlewares?: Array<string | Middleware | { name: string; config: object }>;
};

type SingleTypeRouterConfig = {
  find?: HandlerConfig;
  update?: HandlerConfig;
  delete?: HandlerConfig;
};

type CollectionTypeRouterConfig = {
  find?: HandlerConfig;
  findOne?: HandlerConfig;
  create?: HandlerConfig;
  update?: HandlerConfig;
  delete?: HandlerConfig;
};

type RouterConfig = {
  prefix?: string;
  only?: string[];
  except?: string[];
  config: SingleTypeRouterConfig | CollectionTypeRouterConfig;
};

interface Route {
  method: string;
  path: string;
}
interface Router {
  prefix: string;
  routes: Route[];
}

type ControllerCallback<T extends GenericController = GenericController> =
  (params: { strapi: Strapi }) => T;
type ServiceCallback<T extends GenericService = GenericService> = (params: {
  strapi: Strapi;
}) => T;

export function createCoreRouter(
  uid: string,
  cfg?: RouterConfig = {}
): () => Router;
export function createCoreController<
  T extends GenericController = GenericController
>(uid: string, cfg?: ControllerCallback<T> | T = {}): () => T & Controller;
export function createCoreService<T extends GenericService = GenericService>(
  uid: string,
  cfg?: ServiceCallback<T> | T = {}
): () => T;
export * from "./core";

export * as utils from "./utils";
export * as factories from "./factories";
/**
 *
 * Common utilities used across Strapi typings
 *
 * */

/**
 *
 * Extract the array values into an union type
 *
 **/
export type GetArrayValues<T extends Array<unknown>> = T extends Array<infer U>
  ? U
  : never;

/**
 * Creates a record where every key is a string and every value is `T`
 */
export type StringRecord<T> = Record<string, T>;

/**
 * Retrieve object's (`T`) keys if they extends the given `U` type.
 *
 * @example
 * type X = KeysBy<{ foo: 'bar', bar: 'foo', foobar: 2 }, string>
 * // 'foo' | 'bar'
 *
 * type Base = { x: 'foo' | 'bar' };
 * type Obj = { foo: { x: 'foo' }, bar: { x: 'bar' }, other: { x: '42' } };
 * type X = KeysBy<Obj, Base>
 * // 'foo' | 'bar'
 */
export type KeysBy<T, U> = {
  [key in keyof T]: T[key] extends U ? key : never;
}[keyof T];

/**
 * Retrieve object's (`T`) properties if their value extends the given `U` type.
 *
 * @example
 * type X = KeysBy<{ foo: 'bar', bar: 'foo', foobar: 2 }, string>
 * // { foo: 'bar', bar: 'foo' }
 *
 * type Base = { x: 'foo' | 'bar' };
 * type Obj = { foo: { x: 'foo' }, bar: { x: 'bar' }, other: { x: '42' } };
 * type X = KeysBy<Obj, Base>
 * // { foo: { x: 'foo' }, bar: { x: 'bar' } }
 */
export type PickBy<T, U> = Pick<T, KeysBy<T, U>>;

/**
 * Assign a default value `U` to `T` if `T` is of type `never`
 *
 * @example
 * type X = NeverGuard<{ foo: 'bar' }, string>
 * // { foo: 'bar' }
 *
 * type X = NeverGuard<never>
 * // unknown
 *
 * type X = NeverGuard<never, string>
 * // string
 */
export type NeverGuard<T, U = unknown> = [T] extends [never] ? U : T;

/**
 * Dynamic type based on the keys of `Strapi.Schemas`.
 * It represents all the registered schemas' UID as a union type.
 *
 * @example
 *
 * declare global {
 *   namespace Strapi {
 *     interface Schemas {
 *       'api::foo.foo': CollectionTypeSchema;
 *       'api::bar.bar': ComponentSchema;
 *     }
 *   }
 * }
 *
 * type X = SchemaUID;
 * // 'api::foo.foo' | 'api::bar.bar'
 */
export type SchemaUID = keyof Strapi.Schemas;

/**
 * Get the type of a specific key `U` in `T`
 *
 * @example
 *
 * type X = Get<{ foo: 'bar', 'bar': 'foo' }, 'foo'>
 * // 'bar'
 *
 * type X = Get<{ foo: 'bar', 'bar': 'foo' }, 'bar'>
 * // 'foo'
 */
export type Get<T, U extends keyof T> = T[U];
