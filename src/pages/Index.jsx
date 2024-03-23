import { useState } from "react";
import { Box, VStack, HStack, Input, Button, Text, Textarea, Heading } from "@chakra-ui/react";

const Index = () => {
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await res.json();
    setResponse(data.choices[0].message.content);
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Chat with OpenAI API
      </Heading>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Enter your OpenAI API key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        <Textarea placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button colorScheme="blue" onClick={handleSubmit}>
          Send
        </Button>
        {response && (
          <Box borderWidth={1} borderRadius="md" padding={4}>
            <Heading as="h2" size="md" marginBottom={2}>
              Response:
            </Heading>
            <Text>{response}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
