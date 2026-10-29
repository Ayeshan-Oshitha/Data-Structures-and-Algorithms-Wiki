function reverse(text: string) {
  let input: string[] = text.split("");

  let output: string[] = [];

  for (let i = input.length - 1; i >= 0; i--) {
    output.push(input[i]);
  }

  console.log(output.join(""));
}

reverse("Hi My name is Andrei");
