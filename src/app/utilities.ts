export class Utilities {

  unUrlify(string: string) {
    string = string || '';

    string = string.replace(/[^A-Za-z0-9\s\-]/g, '');
    string.trim();
    string = string.replace(/\-+/g, " ");
    string = string.toLowerCase();

    return string;
  }


  public urlify(string: string): string {
    string = string || '';

    string = string.replace(/[^A-Za-z0-9\s\,\-]/g, '');
    string.trim();
    string = string.replace(/\s+/g, "-");
    string = string.toLowerCase();

    return string;
  }
}
