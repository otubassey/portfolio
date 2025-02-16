import { Snippet } from "./helloWorldSnippets.types";

export const CODE_SNIPPETS: ReadonlyArray<Snippet> = [
    {
        language: "HTML",
        tabs: [
            {
                filename: "helloworldPreV5.html",
                snippet: "<html>\n<body>\n\t<h1>Hello World!!!</h1>\n</body>\n</html>"
            },
            {
                filename: "helloworldV5.html",
                snippet: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n\t<meta charset=\"UTF-8\">\n\t<title>Some title</title>\n</head>\n<body>\n\t<h1>Hello World!!!</h1>\n</body>\n</html>"
            }
        ]
    },
    {
        language: "XHTML",
        tabs: [
            {
                filename: "helloworld.xhtml",
                snippet: "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/TR/xhtml1\" xml:lang=\"en\" lang=\"en\">\n<head>\n\t<meta charset=\"UTF-8\"/>\n</head>\n<body>\n\t<h1>Hello World!!!</h1>\n</body>\n</html>"
            }
        ]
    },
    {
        language: "CSS",
        tabs: [
            {
                filename: "helloworld.css",
                snippet: "body::before\n\tcontent: \"Hello World!!!\""
            }
        ]
    },
    {
        language: "SASS",
        tabs: [
            {
                filename: "helloworld.sass",
                snippet: "body::before\n\tcontent: \"Hello World!!!\""
            }
        ]
    },
    {
        language: "Javascript",
        tabs: [
            {
                filename: "helloworld.js",
                snippet: "console.log(\"Hello World!!!\");"
            }
        ]
    },
    {
        language: "Typescript",
        tabs: [
            {
                filename: "helloworld.ts",
                snippet: "console.log(\"Hello World!!!\");"
            }
        ]
    },
    {
        language: "Java",
        tabs: [
            {
                filename: "helloWorld.java",
                snippet: "class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(\"Hello World!!!\");\n\t}\n}"
            }
        ]
    },
    {
        language: "Dart",
        tabs: [
            {
                filename: "helloWorld.dart",
                snippet: "void main() {\n\tprint(\"Hello World!!!\");\n}"
            }
        ]
    },
    {
        language: "Scala",
        tabs: [
            {
                filename: "helloScala2.scala",
                snippet: "object HelloWorld extends App {\n\tdef main(args: Array[String]) = {\n\t\tprintln(\"Hello World!!!\");\n\t}\n}"
            },
            {
                filename: "helloWorldScala3.scala",
                snippet: "@main def hello() = println(\"Hello, World!!!\")"
            }
        ]
    },
    {
        language: "JSON",
        tabs: [
            {
                filename: "helloWorld.json",
                snippet: "{\n\tvalue: \"Hello World!!!\"\n}"
            }
        ]
    },
    {
        language: "YAML",
        tabs: [
            {
                filename: "helloWorld.yaml",
                snippet: "value: \"Hello World!!!\""
            }
        ]
    },
    {
        language: "XML",
        tabs: [
            {
                filename: "helloWorld.xml",
                snippet: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<text><![CDATA[Hello World!!!]]></text>"
            }
        ]
    },
    {
        language: "New Skill",
        tabs: [
            {
                filename: "helloWorld...",
                snippet: "Loading..."
            }
        ]
    }
] as const;
