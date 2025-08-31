import sys
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Path to the local model folder
model_path = "model"

# Load model & tokenizer only once (cached in memory after first run)
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    device_map="auto",       # automatically use GPU if available
    torch_dtype=torch.float16
)

def generate_response(user_input: str) -> str:
    inputs = tokenizer(user_input, return_tensors="pt").to(model.device)

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=200,
            do_sample=True,
            temperature=0.7,
            top_p=0.9,
            repetition_penalty=1.2
        )

    return tokenizer.decode(outputs[0], skip_special_tokens=True)

if __name__ == "__main__":
    # sys.argv[1] is the message passed from Node.js
    if len(sys.argv) < 2:
        print("Error: No input provided")
        sys.exit(1)

    user_message = sys.argv[1]
    response = generate_response(user_message)
    print(response)  # Node.js will capture stdout
