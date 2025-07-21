// DTO for User
export default class UserDTO {
    constructor(userResponse) {
        this.id = userResponse._id ?? userResponse.id,
        this.first_name = userResponse.first_name,
        this.last_name = userResponse.last_name,
        this.email = userResponse.email,
        this.role = userResponse.role,
        this.cartId = userResponse.cart
    }
}