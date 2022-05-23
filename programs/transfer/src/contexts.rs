use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction()]
pub struct SendSolToAddr<'info> {

    /// CHECK: we read this key only
    #[account(mut)]
    pub to_address: UncheckedAccount<'info>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}