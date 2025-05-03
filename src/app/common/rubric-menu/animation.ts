import {
  animate,
  query,
  sequence,
  stagger,
  style,
  transition,
  trigger
} from "@angular/animations";

export const DropDownAnimation = trigger("dropDownMenu", [
  transition(":enter", [
    style({ height: 0, overflow: "hidden" }),
    query(".menu-item", [
      style({ opacity: 0, transform: "translateY(-50px)" })
    ], { optional: true }),
    sequence([
      animate("200ms", style({ height: "100vh" })),
      query(".menu-item", [
        stagger(-50, [
          animate("400ms ease", style({ opacity: 1, transform: "none" }))
        ])
      ], { optional: true })
    ])
  ]),

  transition(":leave", [
    style({ height: "*", overflow: "hidden" }),
    query(".menu-item", [style({ opacity: 1, transform: "none" })]),
    sequence([
      query(".menu-item", [
        stagger(50, [
          animate(
            "400ms ease",
            style({ opacity: 0, transform: "translateY(-50px)" })
          )
        ])
      ]),
      animate("200ms", style({ height: 0 }))
    ])
  ])
]);

export const DropDownAnimation2Level = trigger("dropDownMenu2", [
  transition(":enter", [
    style({ height: 0, overflow: "hidden" }),
    query(".menu-item-2", [
      style({ opacity: 0, transform: "translateY(-50px)" })
    ], { optional: true }),
    sequence([
      animate("200ms", style({ height: "*" })),
      query(".menu-item-2", [
        stagger(-50, [
          animate("400ms ease", style({ opacity: 1, transform: "none" }))
        ])
      ], { optional: true })
    ])
  ]),

  // transition(":leave", [
  //   style({ height: "*", overflow: "hidden" }),
  //   query(".menu-item", [style({ opacity: 1, transform: "none" })]),
  //   sequence([
  //     query(".menu-item", [
  //       stagger(50, [
  //         animate(
  //           "400ms ease",
  //           style({ opacity: 0, transform: "translateY(-50px)" })
  //         )
  //       ])
  //     ]),
  //     animate("200ms", style({ height: 0 }))
  //   ])
  // ])
]);
