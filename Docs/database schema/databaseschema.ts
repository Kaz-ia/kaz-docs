// =============================
// 📚 SubscriptionType TABLE
// =============================

export const SubscriptionType = {
    SubscriptionType_id: String,
    SubscriptionType_name: String,
    SubscriptionType_price: String,
    SubscriptionType_duration: String,
    SubscriptionType_created_at: String,
    SubscriptionType_updated_at: String,
    SubscriptionType_deleted_at: String,
    SubscriptionType_deleted_by: String,
    SubscriptionType_deleted_reason: String,
    SubscriptionType_experation_date: String,
}

// =============================
// 🧑 USER TABLE
// =============================

export const User = {
    User_id: String,
    User_name: String,
    User_email: String,
    User_password: String,

    User_role: String,
    User_Active: Boolean,

    User_created_at: String,
    User_updated_at: String,
    User_deleted_at: String,
    User_deleted_by: String,
    User_deleted_reason: String,
    User_experation_date: String,

    User_subscription_Type: SubscriptionType,

    User_payment_status: String,
    User_payment_method: String,
    User_payment_date: String,
    User_payment_amount: String,
}


// =============================
// 📚 Contact TABLE
// =============================

export const Contact = {
    Contact_id: String,
    Contact_fullname: String,
    Contact_email: String,
    Contact_SubscriptionType: SubscriptionType,
    Contact_message: String,
    Contact_created_at: String,
    Contact_updated_at: String,
}

// =============================
// policy Contacts
