import { type RecordId, Surreal } from "surrealdb.js"
export const UserLoginQuery = "SELECT * FROM user WHERE email = $email AND password AND crypto::bcrypt::compare(password, $password) LIMIT 1;"
export type UserLoginResult = [Array<{calling_code:string,country_code:string,email:string,first_name:string,id:RecordId< |"user">,image:string|null,joined:Date,last_name:string,password:string|null,phone_number:string,referrer:RecordId< |"user">|null,role:string|null,stripe_customer_id:string|null,updated_at:Date,}>,]
export type UserLoginVariables = {    password: string,
    email: string,
}
export const GetUserQuery = "SELECT id, first_name, last_name, email, role FROM ONLY $auth;"
export type GetUserResult = [{email:string,first_name:string,id:RecordId< |"user">,last_name:string,role:string|null,},]
export type Queries = {
    [UserLoginQuery]: {variables: UserLoginVariables, result: UserLoginResult }
    [GetUserQuery]: {variables: never, result: GetUserResult }
}


type QueryKeys = keyof Queries
type InferVariables<Q extends keyof Queries> = Queries[Q]["variables"]
type InferResult<Q extends keyof Queries> = Queries[Q]["result"]
type QueryWithVariables<Q extends QueryKeys> = InferVariables<Q> extends never ? Q : Q & string
type QueryWithoutVariables<Q extends QueryKeys> = InferVariables<Q> extends never ? Q : Exclude<Q, string>

Surreal.prototype.typed = function <Q extends keyof Queries, V extends InferVariables<Q>>(query: Q, variables?: V): Promise<InferResult<Q>> {
    return this.query(query, variables)
}

declare module "surrealdb.js" {
    interface Surreal {
        typed<Q extends QueryKeys>(query: QueryWithVariables<Q>, variables: InferVariables<Q>): Promise<InferResult<Q>>;
        typed<Q extends QueryKeys>(query: QueryWithoutVariables<Q>): Promise<InferResult<Q>>;
    }
}
