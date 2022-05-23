
use anchor_lang::prelude::*;

#[error_code]
pub enum TransferError {
    #[msg("Invalid address")]
    InvalidAddress,

    #[msg("Not allowed")]
    NotAllowed,

    #[msg("Can't be zero amount")]
    ZeroAmount,
}
