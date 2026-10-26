<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Featured dishes and venue details live in `src/lib/restaurant.ts`, while the user-supplied full menu is structured in `src/lib/full-menu.json`; keep them aligned because dish prices must match the supplied menu.
- Generated food and venue imagery is illustrative, not a claim to show actual restaurant dishes or premises; this preserves truthful presentation until real photos are supplied.

- Dietary recommendations are request-only, do not persist health details, and only rank confirmed menu items; allergies or restrictive diets require ingredient confirmation.

- Orders go through the restaurant's official external ordering link (app.anota.ai/m/iyBQVuyEw) via the "Peça aqui" button; the site does not build orders itself. Reservation requests use the Linktree reservations contact 5512988551710; never imply an unconfirmed booking or order was accepted.

