use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    system_instruction,
    program::{
        invoke
    },
};

pub mod contexts;
pub mod errors;

pub use contexts::*;
use errors::*;

declare_id!("H7osZtwGvXjiW1JMeGNbVY8SmoxuADP1vQg3PmG2u2gp");

#[program]
pub mod transfer {
    use super::*;
    pub fn send_sol_to_addr(
        _ctx: Context<SendSolToAddr>,
        amount: u64
    ) -> Result<()> {
        if amount == 0 {
            return Err(error!(TransferError::ZeroAmount));
        }
        invoke(
            &system_instruction::transfer(_ctx.accounts.authority.key, _ctx.accounts.to_address.key, amount),
            &[
                _ctx.accounts.authority.to_account_info(),
                _ctx.accounts.to_address.to_account_info(),
                _ctx.accounts.system_program.to_account_info(),
            ],
        )?;
        Ok(())
    }
}