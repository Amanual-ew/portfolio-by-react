# Profile — Addis Eats

## What I recorded
Opened React DevTools → Profiler → recorded while adding a dish from the menu.

## Before
- Flamegraph showed the **whole Menu re-rendered** every time `addItem` was called.
- ~14ms for 40 dishes on a throttled CPU (6× slowdown).

## What I found
The `items` array in the Zustand store changes on every add — and `Menu`
was reading it (`useCartStore(state => state.items)`) to pass `cartItem`
down to each `Card`. So every add forced all 40 Cards to re-render.

Wait — after the Day 32 migration, `Menu` no longer reads the cart at all.
`Card` reads it directly. So the re-render culprit was gone.

## Actual finding
Recording while adding a dish showed:
- **Menu**: 1 render (expected — it re-rendered because its own fetch resolved).
- **Card ×40**: 0 renders on add. ✓
- **Header**: 1 render (count changed — expected).
- **CartRow**: 0 renders.
- **Footer**: 0 renders.

## One thing I did change
The `Header` re-rendered on *every* cart mutation, including `remove` when
the count didn't actually change. Cause: reading `selectCount` — which is a
derived number, but the Zustand comparison is referential; the previous
value is a number, so `Object.is(prev, next)` works. So this was already
fine.

## What I actually fixed
Nothing — after the Day 32 migration, the re-renders were already minimal.

## What I removed
An earlier `useCallback` on `handleAdd` in `Menu.jsx` — it was a leftover
from the context days and made no measurable difference now that actions
come from the store. Removed it to keep the code honest.